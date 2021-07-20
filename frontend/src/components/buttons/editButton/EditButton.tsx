import React, { useContext } from 'react';

import { FiEdit } from 'react-icons/fi';
import { UpdatePropertyModel } from '../../../models/property';
import MainContext from '../../../store/MainContext';

import { EditButtonButton } from './EditButtonButton';

const EditButton = (props: UpdatePropertyModel): JSX.Element => {
  const context = useContext(MainContext);

  function editProperty() {
    const isEditingProperty = {
      id: props.property._id,
      isEditing: true,
    };

    context.setState({
      ...context.state,
      isEditingProperty: isEditingProperty,
      showAddProperty: true,
      title: props.property.title,
      description: props.property.description,
      value: props.property.value,
      area: props.property.area,
      address: props.property.address,
      public_place: props.property.public_place,
      number: props.property.number,
      adjunct: props.property.adjunct,
      neighborhood: props.property.neighborhood,
      zip_code: props.property.zip_code,
      city: props.property.city,
      state: props.property.state,
    });
  }

  return (
    <EditButtonButton className="property-edit" onClick={() => editProperty()}>
      <FiEdit />
    </EditButtonButton>
  );
};

export default React.memo(EditButton);
