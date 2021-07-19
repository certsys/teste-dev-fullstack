import React, { useContext } from 'react';
import { AiOutlineAreaChart } from 'react-icons/ai';
import MainContext from '../../store/MainContext';
import CheckButton from '../buttons/checkButton/CheckButton';
import DeleteButton from '../buttons/deleteButton/DeleteButton';
import InputProperty from '../inputs/inputProperty/InputProperty';
import TextAreaProperty from '../inputs/textAreaProperty/textAreaProperty';
import { NewPropertyDiv } from './NewTaskDiv';

const NewProperty = (): JSX.Element => {
  const context = useContext(MainContext);

  console.log(context);

  return (
    <NewPropertyDiv className="table-row new-property">
      <div className="top">
        <label className="title">
          Título:
          <InputProperty field={'title'} />
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
                <InputProperty field={'address'} />
              </label>
              <label className="number">
                Número:
                <InputProperty field={'number'} />
              </label>
              <label className="neighborhood">
                Bairro:
                <InputProperty field={'neighborhood'} />
              </label>
              <label className="city">
                Cidade:
                <InputProperty field={'city'} />
              </label>
              <label className="state">
                Estado:
                <InputProperty field={'state'} />
              </label>
              <label className="adjunct">
                Conplemento:
                <InputProperty field={'adjunct'} />
              </label>
              <label className="public-place">
                Logradouro:
                <InputProperty field={'public_place'} />
              </label>
              <label className="zip_code">
                CEP:
                <InputProperty field={'zip_code'} />
              </label>
            </div>
            <div className="infos">
              <label className="price">
                Valor:
                <InputProperty field={'value'} type={'number'} />
              </label>
              <div className="area">
                <label>
                  Área (m²):
                  <span>
                    <InputProperty field={'area'} />
                    <AiOutlineAreaChart />
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="description">
            <h4>Descrição:</h4>
            <TextAreaProperty field={'description'} />
          </div>
        </div>
      </div>
    </NewPropertyDiv>
  );
};

export default React.memo(NewProperty);
