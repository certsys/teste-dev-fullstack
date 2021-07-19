import React from 'react';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AddPropertyButtonButton } from './AddPropertyButtonButton';

const AddPropertyButton = (): JSX.Element => {
  return (
    <AddPropertyButtonButton className="table-add">
      <AiOutlinePlusCircle />
    </AddPropertyButtonButton>
  );
};

export default React.memo(AddPropertyButton);
