import React from 'react';

import CheckButton from '../buttons/checkButton/CheckButton';
import DeleteButton from '../buttons/deleteButton/DeleteButton';
import EditButton from '../buttons/editButton/EditButton';
import TextProperty from '../inputs/textProperty/TextProperty';
import { PropertyRowDiv } from './PropertyRowDiv';

const PropertyRow = (): JSX.Element => {
  return (
    <PropertyRowDiv className="table-row property-row">
      <TextProperty></TextProperty>
      <div className="property-buttons">
        <CheckButton />
        <EditButton />
        <DeleteButton />
      </div>
    </PropertyRowDiv>
  );
};

export default React.memo(PropertyRow);
