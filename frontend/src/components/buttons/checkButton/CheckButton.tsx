import React, { useContext } from 'react';

import { BsCheckBox } from 'react-icons/bs';
import { returnFieldsEmpty } from '../../../helpers/check-fields-helper';
import { viaCep } from '../../../helpers/viaCEP-helper';
import { TCheckAddButton } from '../../../models/types';
import MainContext from '../../../store/MainContext';
import { CheckButtonButton } from './CheckButtonButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CheckButton = (props: TCheckAddButton): JSX.Element => {
  const context = useContext(MainContext);
  const [open, setOpen] = React.useState(false);

  function addProperty() {
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
    setOpen(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <CheckButtonButton className="property-check">
          <BsCheckBox />
        </CheckButtonButton>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Alerta!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está certo de que deseja prosseguir ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Não
          </Button>
          <Button onClick={addOrEditProperty} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(CheckButton);
