import React from 'react';

import { FiEdit } from 'react-icons/fi';

import { EditButtonButton } from './EditButtonButton';

const EditButton = (): JSX.Element => {
  return (
    <EditButtonButton className="property-edit">
      <FiEdit />
    </EditButtonButton>
  );
};

export default React.memo(EditButton);
