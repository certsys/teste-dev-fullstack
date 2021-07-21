import React, { useContext } from 'react';

import { BsCheckBox } from 'react-icons/bs';
import { returnFieldsEmpty } from '../../../helpers/check-fields-helper';
import { viaCep } from '../../../helpers/viaCEP-helper';
import { TCheckAddButton } from '../../../models/types';
import MainContext from '../../../store/MainContext';
import { CheckButtonButton } from './CheckButtonButton';

const CheckButton = (props: TCheckAddButton): JSX.Element => {
  const context = useContext(MainContext);

  function addProperty() {
    if (!confirm('Tem certeza que deseja adicionar este imóvel?')) return;
    const newProperty = {
      title: context?.state.title,
      description: context?.state.description,
      value: context?.state.value,
      area: context?.state.area,
      address: context?.state.address,
      public_place: context?.state.public_place,
      number: context?.state.number,
      adjunct: context?.state.adjunct,
      neighborhood: context?.state.neighborhood,
      zip_code: context?.state.zip_code,
      city: context?.state.city,
      state: context?.state.state,
    };
    const newQuant = context.state.quantProperty + 1;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProperty),
    };

    fetch('http://localhost:5050/api/properties', requestOptions)
      .then(res => {
        context.setState({
          ...context.state,
          showAddProperty: false,
          quantProperty: newQuant,
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
        alert('Novo imóvel cadastrado!');
      })
      .catch(err => console.log(err));
  }

  function editProperty() {
    if (!confirm('Tem certeza que deseja editar este imóvel?')) return;
    const newProperty = {
      title: context?.state.title,
      description: context?.state.description,
      value: context?.state.value,
      area: context?.state.area,
      address: context?.state.address,
      public_place: context?.state.public_place,
      number: context?.state.number,
      adjunct: context?.state.adjunct,
      neighborhood: context?.state.neighborhood,
      zip_code: context?.state.zip_code,
      city: context?.state.city,
      state: context?.state.state,
    };
    const id = context?.state.isEditingProperty.id;

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProperty),
    };

    fetch('http://localhost:5050/api/properties/' + id, requestOptions)
      .then(res => res.json())
      .then(() => {
        context.setState({
          ...context.state,
          showAddProperty: false,
          isEditingProperty: false,
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
        alert('Imóvel editado!');
        window.location.reload();
      });
  }

  function addOrEditProperty() {
    if (!context.state.isEditingProperty) {
      if (returnFieldsEmpty(context?.state).length) {
        alert(`Opss.. campo vazio!`);
        return;
      }

      viaCep(context?.state.zip_code).then(resp => {
        if (!resp) return alert('CEP inválido!');
        addProperty();
      });
    }
    if (context.state.isEditingProperty) {
      if (returnFieldsEmpty(context?.state).length) {
        alert(`Opss.. campo vazio!`);
        return;
      }

      viaCep(context?.state.zip_code).then(resp => {
        if (!resp) return alert('CEP inválido!');
        editProperty();
      });
    }
  }

  return (
    <CheckButtonButton
      className="property-check"
      onClick={() => addOrEditProperty()}
    >
      <BsCheckBox />
    </CheckButtonButton>
  );
};

export default React.memo(CheckButton);
