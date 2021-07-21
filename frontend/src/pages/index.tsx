import React, { useEffect, useState } from 'react';
import AddPropertyButton from '../components/buttons/addPropertyButton/AddPropertyButton';
import InputSearchProperty from '../components/inputs/seachProperty/inputSearchProperty';
import NewProperty from '../components/sections/newProperty/NewProperty';
import { PropertyModel } from '../models/property';
import MainContext, { data } from '../store/MainContext';

import { HomeSection } from '../styles/pages/Home';
import PropertyNotFound from '../components/sections/PropertyNotFound/PropertyNotFound';
import PropertyRow from '../components/sections/PropertyRow/PropertyRow';

const Home = (): JSX.Element => {
  const [state, setState] = useState(data);
  const [properties, setProperties] = useState<PropertyModel[]>([]);

  const showAddProperty = state.showAddProperty;
  const quantProperty = state.quantProperty;
  const isEditing = state.isEditingProperty.isEditing;

  useEffect(() => {
    fetch(`http://localhost:5050/api/properties?search=${state.searchTerm}`)
      .then(res => res.json())
      .then(data => {
        setState({
          ...state,
          quantProperty: data.length,
        });
        setProperties(data);
      })
      .catch(err => {
        setState({
          ...state,
          quantProperty: 0,
        });
      });
  }, [state.quantProperty, state.searchTerm]);

  return (
    <MainContext.Provider value={{ state, setState }}>
      <HomeSection>
        <div className="table">
          <div className="table-head">
            <div className="table-name">
              <span>Imóveis</span>
            </div>
            {isEditing ? <></> : <InputSearchProperty />}
            <AddPropertyButton />
          </div>

          <div className="table-body">
            <div className="table-add-row">
              {showAddProperty ? <NewProperty /> : <></>}
            </div>
            {showAddProperty || quantProperty === 0 ? (
              <></>
            ) : (
              <>
                {properties.map(property => {
                  return (
                    <PropertyRow
                      key={property._id}
                      property={property}
                    ></PropertyRow>
                  );
                })}
              </>
            )}
            {properties.length === 0 || quantProperty === 0 ? (
              <PropertyNotFound />
            ) : (
              ''
            )}
          </div>
        </div>
      </HomeSection>
    </MainContext.Provider>
  );
};

export default React.memo(Home);
