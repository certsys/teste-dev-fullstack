import React from 'react';
import { AiOutlineAreaChart } from 'react-icons/ai';
import CheckButton from '../buttons/checkButton/CheckButton';
import DeleteButton from '../buttons/deleteButton/DeleteButton';
import InputProperty from '../inputs/inputProperty/InputProperty';
import TextAreaProperty from '../inputs/textAreaProperty/textAreaProperty';
import { NewPropertyDiv } from './NewTaskDiv';

const NewProperty = (): JSX.Element => {
  return (
    <NewPropertyDiv className="table-row new-property">
      <div className="top">
        <label className="title">
          Título:
          <InputProperty />
        </label>
        <div className="property-buttons">
          <CheckButton />

          <DeleteButton />
        </div>
      </div>
      <div className="main-content">
        <div className="collumn">
          <div className="location">
            <div className="address">
              <label className="street">
                Rua:
                <InputProperty />
              </label>
              <label className="number">
                Número:
                <InputProperty />
              </label>
              <label className="neighborhood">
                Bairro:
                <InputProperty />
              </label>
              <label className="city">
                Cidade:
                <InputProperty />
              </label>
              <label className="state">
                Estado:
                <InputProperty />
              </label>
              <label className="adjunct">
                Conplemento:
                <InputProperty />
              </label>
              <label className="public-place">
                Logradouro:
                <InputProperty />
              </label>
            </div>
            <div className="infos">
              <label className="price">
                Valor:
                <InputProperty />
              </label>
              <div className="area">
                <label>
                  Área (m²):
                  <span>
                    <InputProperty />
                    <AiOutlineAreaChart />
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="description">
            <h4>Descrição:</h4>
            <TextAreaProperty />
          </div>
        </div>
      </div>
    </NewPropertyDiv>
  );
};

export default React.memo(NewProperty);
