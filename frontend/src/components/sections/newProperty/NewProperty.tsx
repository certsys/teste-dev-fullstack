import React, { useContext } from 'react';
import { AiOutlineAreaChart } from 'react-icons/ai';
import MainContext from '../../../store/MainContext';
import CheckButton from '../../buttons/checkButton/CheckButton';
import DeleteButton from '../../buttons/deleteButton/DeleteButton';
import InputProperty from '../../inputs/inputProperty/InputProperty';
import TextAreaProperty from '../../inputs/textAreaProperty/textAreaProperty';
import { NewPropertyDiv } from './NewPropertyDiv';

const NewProperty = (): JSX.Element => {
  const context = useContext(MainContext);

  const editProperty = {
    title: context?.state.title,
    description: context?.state.description,
    value: context?.state.value,
    area: context?.state.area,
    address: context?.state.address,
    public_place: context?.state.public_place,
    number: context?.state.number,
    adjunct: context?.state.adjunct,
    neighborhood: context?.state.neighborhood,
    zip_code: context?.state.zip_code,
    city: context?.state.city,
    state: context?.state.state,
  };

  return (
    <NewPropertyDiv className="table-row new-property">
      <div className="top">
        <label className="title">
          Título:
          <InputProperty field={'title'} value={editProperty.title} />
        </label>
        <div className="property-buttons">
          <CheckButton to="add" />

          <DeleteButton to="cancel" />
        </div>
      </div>
      <div className="main-content">
        <div className="collumn">
          <div className="location">
            <div className="address-all">
              <label className="address">
                Rua:
                <InputProperty field={'address'} value={editProperty.address} />
              </label>
              <label className="number">
                Número:
                <InputProperty field={'number'} value={editProperty.number} />
              </label>
              <label className="neighborhood">
                Bairro:
                <InputProperty
                  field={'neighborhood'}
                  value={editProperty.neighborhood}
                />
              </label>
              <label className="city">
                Cidade:
                <InputProperty field={'city'} value={editProperty.city} />
              </label>
              <label className="state">
                Estado:
                <InputProperty field={'state'} value={editProperty.state} />
              </label>
              <label className="adjunct">
                Conplemento:
                <InputProperty field={'adjunct'} value={editProperty.adjunct} />
              </label>
              <label className="public-place">
                Logradouro:
                <InputProperty
                  field={'public_place'}
                  value={editProperty.public_place}
                />
              </label>
              <label className="zip_code">
                CEP:
                <InputProperty
                  field={'zip_code'}
                  value={editProperty.zip_code}
                />
              </label>
            </div>
            <div className="infos">
              <label className="price">
                Valor:
                <InputProperty
                  field={'value'}
                  type={'number'}
                  value={editProperty.value}
                />
              </label>
              <div className="area">
                <label>
                  Área (m²):
                  <span>
                    <InputProperty field={'area'} value={editProperty.area} />
                    <AiOutlineAreaChart />
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="description">
            <h4>Descrição:</h4>
            <TextAreaProperty
              field={'description'}
              value={editProperty.description}
            />
          </div>
        </div>
      </div>
    </NewPropertyDiv>
  );
};

export default React.memo(NewProperty);
