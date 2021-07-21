import React, { useContext } from 'react';

import { ImCancelCircle } from 'react-icons/im';
import MainContext from '../../../store/MainContext';
import { CancelButtonButton } from './CancelButtonButton';

const CancelButton = (): JSX.Element => {
  const context = useContext(MainContext);

  function cancelEdit(): void {
    context.setState({
      ...context.state,
      isEditingProperty: false,
      showAddProperty: false,
      title: '',
      description: '',
      value: '',
      area: '',
      address: '',
      public_place: '',
      number: '',
      adjunct: '',
      neighborhood: '',
      zip_code: '',
      city: '',
      state: '',
    });
  }

  return (
    <CancelButtonButton
      className="property-delete"
      onClick={() => cancelEdit()}
    >
      <ImCancelCircle />
    </CancelButtonButton>
  );
};

export default React.memo(CancelButton);
