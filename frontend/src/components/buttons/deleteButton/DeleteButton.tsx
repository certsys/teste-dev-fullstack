import React, { useContext } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';
import { TCheckDelButton } from '../../../models/types';
import MainContext from '../../../store/MainContext';
import { DeleteButtonButton } from './DeleteButtonButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteButton = (props: TCheckDelButton): JSX.Element => {
  const context = useContext(MainContext);
  const [open, setOpen] = React.useState(false);

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
        alert('Imóvel deletado!');
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
      setOpen(false);
      cancelEdit();
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
        <DeleteButtonButton className="property-delete">
          <AiOutlineDelete />
        </DeleteButtonButton>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={deleteOrEditProperty} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(DeleteButton);
