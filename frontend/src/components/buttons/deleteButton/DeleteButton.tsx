import React, { useContext } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';
import { DeleteButtonButton } from './DeleteButtonButton';

const DeleteButton = (): JSX.Element => {
  return (
    <DeleteButtonButton className="property-delete">
      <AiOutlineDelete />
    </DeleteButtonButton>
  );
};

export default React.memo(DeleteButton);
