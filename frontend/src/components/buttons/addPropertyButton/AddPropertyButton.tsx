import React, { useContext } from 'react';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { viaCep } from '../../../helpers/viaCEP-helper';
import MainContext from '../../../store/MainContext';
import { AddPropertyButtonButton } from './AddPropertyButtonButton';

const AddPropertyButton = (): JSX.Element => {
  const context = useContext(MainContext);

  function showAddPropertyTrue() {
    context?.setState({
      ...context.state,
      showAddProperty: true,
      isEditingProperty: false,
      newPropertyValue: '',
    });
  }
  return (
    <AddPropertyButtonButton
      className="table-add"
      onClick={() => showAddPropertyTrue()}
    >
      <AiOutlinePlusCircle />
    </AddPropertyButtonButton>
  );
};

export default React.memo(AddPropertyButton);
