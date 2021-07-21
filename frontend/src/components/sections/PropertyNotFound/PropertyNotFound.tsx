import React from 'react';
import { PropertyNotFoundDiv } from './PropertyNotFoundDiv';

const PropertyNotFound = (): JSX.Element => {
  return (
    <PropertyNotFoundDiv className="property-not-found">
      <h3>Nenhum imóvel encontrado.</h3>
    </PropertyNotFoundDiv>
  );
};

export default PropertyNotFound;
