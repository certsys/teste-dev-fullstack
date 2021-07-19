import React from 'react';
import { AiOutlineAreaChart } from 'react-icons/ai';

import CheckButton from '../buttons/checkButton/CheckButton';
import DeleteButton from '../buttons/deleteButton/DeleteButton';
import EditButton from '../buttons/editButton/EditButton';
import { PropertyRowDiv } from './PropertyRowDiv';

const PropertyRow = (): JSX.Element => {
  return (
    <PropertyRowDiv className="table-row property-row">
      <div className="top">
        <h3 className="title">Apartemento no Centro</h3>
        <div className="property-buttons">
          <CheckButton />
          <EditButton />
          <DeleteButton />
        </div>
      </div>
      <div className="main-content">
        <div className="collumn">
          <div className="location">
            <div className="address">
              <span>Rua nogueira, 90 - Bairro, Cidade/estado</span>
              <span>conplemento - logradouro</span>
            </div>
            <div className="infos">
              <div className="price">
                <span>R$ 550.000,00</span>
              </div>
              <div className="area">
                <AiOutlineAreaChart /> <span>140m²</span>
              </div>
            </div>
          </div>

          <div className="description">
            <h4>Sobre o Imóvel</h4>
            <p>
              Exelente apartamento com 2 quartos.Exelente apartamento com 2
              quartos.Exelente apartamento com 2 quartos.Exelente apartamento
              com 2 quartos.
            </p>
          </div>
        </div>
      </div>
    </PropertyRowDiv>
  );
};

export default React.memo(PropertyRow);
