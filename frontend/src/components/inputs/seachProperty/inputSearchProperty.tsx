import React, { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import MainContext from '../../../store/MainContext';
import { InputSearchPropertyDiv } from './InputSearchPropertyDiv';

const InputSearchProperty = (): JSX.Element => {
  const context = useContext(MainContext);

  const searchTerm = context.state.searchTerm;

  function changeValue(value: string) {
    if (value.length === 0) {
      context.setState({
        ...context.state,
        searchTerm: '',
      });
    } else {
      context.setState({
        ...context.state,
        searchTerm: value,
      });
    }
  }

  const event = (evt: any) => changeValue(evt.target.value);

  return (
    <InputSearchPropertyDiv>
      <input type="search" placeholder="Pesquise por título" onChange={event} />
      {!searchTerm ? <FiSearch /> : ''}
    </InputSearchPropertyDiv>
  );
};

export default InputSearchProperty;
