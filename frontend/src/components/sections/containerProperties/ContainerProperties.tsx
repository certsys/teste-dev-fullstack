import React from 'react';
import { ContainerPropertyModel } from '../../../models/property';
import PropertyRow from '../PropertyRow/PropertyRow';

const ConainerProperties = (prop: ContainerPropertyModel): JSX.Element => {
  return (
    <>
      {prop.properties.map(property => {
        return (
          <PropertyRow key={property._id} property={property}></PropertyRow>
        );
      })}
    </>
  );
};

export default React.memo(ConainerProperties);
