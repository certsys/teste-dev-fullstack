import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { formatPrice } from '../../helpers/format-helper';
import { PropertyPropModel } from '../../models/property';

import CheckButton from '../buttons/checkButton/CheckButton';
import DeleteButton from '../buttons/deleteButton/DeleteButton';
import EditButton from '../buttons/editButton/EditButton';
import { PropertyRowDiv } from './PropertyRowDiv';

const PropertyRow = (props: PropertyPropModel): JSX.Element => {
  return (
    <PropertyRowDiv className="table-row property-row">
      <div className="top">
        <h3 className="title">{props.property.title}</h3>
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
              <span>
                {props.property.address}, {props.property.number} -{' '}
                {props.property.neighborhood},{props.property.city}/
                {props.property.state}
              </span>
              <span>
                {props.property.adjunct} - {props.property.public_place}
              </span>
            </div>
            <div className="infos">
              <div className="price">
                <span>{formatPrice(props.property.value)}</span>
              </div>
              <div className="area">
                <AiOutlineAreaChart /> <span>{props.property.area}</span>
              </div>
            </div>
          </div>

          <div className="description">
            <h4>Sobre o Imóvel</h4>
            <p>{props.property.description}</p>
          </div>
        </div>
      </div>
    </PropertyRowDiv>
  );
};

export default React.memo(PropertyRow);
