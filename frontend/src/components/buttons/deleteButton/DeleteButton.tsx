import React, { useContext } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';
import { TCheckDelButton } from '../../../models/types';
import MainContext from '../../../store/MainContext';
import { DeleteButtonButton } from './DeleteButtonButton';

const DeleteButton = (props: TCheckDelButton): JSX.Element => {
  const context = useContext(MainContext);

  function deleteProperty(): void {
    const id = props.id;
    const requestOptions = {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    };

    const newQuant = context.state.quantProperty - 1;

    fetch('http://localhost:5050/api/properties/' + id, requestOptions).then(
      () => {
        context.setState({
          ...context.state,
          quantProperty: newQuant,
        });
      },
    );
  }

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

  function deleteOrEditProperty(): void {
    if (props.to == 'del') {
      deleteProperty();
    }
    if (props.to == 'cancel') {
      cancelEdit();
    }
  }

  return (
    <DeleteButtonButton
      className="property-delete"
      onClick={() => deleteOrEditProperty()}
    >
      <AiOutlineDelete />
    </DeleteButtonButton>
  );
};

export default React.memo(DeleteButton);
