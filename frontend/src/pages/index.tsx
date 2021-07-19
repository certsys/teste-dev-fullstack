import React, { useEffect, useState } from 'react';
import AddPropertyButton from '../components/buttons/addPropertyButton/AddPropertyButton';
import NewProperty from '../components/newProperty/NewProperty';
import PropertyRow from '../components/PropertyRow/PropertyRow';
import { PropertyModel } from '../models/property';
import MainContext, { data } from '../store/MainContext';

import { HomeSection } from '../styles/pages/Home';

const Home = (): JSX.Element => {
  const [state, setState] = useState(data);
  const [properties, setProperties] = useState<PropertyModel[]>([]);

  const showAddProperty = state.showAddProperty;

  useEffect(() => {
    fetch(`http://localhost:5050/api/properties`)
      .then(res => res.json())
      .then(data => {
        setState({
          ...state,
          quantProperty: data.length,
        });
        setProperties(data);
      });
  }, [state.quantProperty]);

  return (
    <MainContext.Provider value={{ state, setState }}>
      <HomeSection>
        <div className="table">
          <div className="table-head">
            <div className="table-name">
              <span>Imóveis</span>
            </div>
            <AddPropertyButton />
          </div>

          <div className="table-body">
            <div className="table-add-row">
              {showAddProperty ? <NewProperty /> : <></>}
            </div>
            {showAddProperty ? (
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
          </div>
        </div>
      </HomeSection>
    </MainContext.Provider>
  );
};

export default React.memo(Home);
