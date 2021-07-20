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
    }
    context.setState({
      ...context.state,
      searchTerm: value,
    });
  }

  return (
    <InputSearchPropertyDiv>
      <input type="search" onChange={evt => changeValue(evt.target.value)} />
      {!searchTerm ? <FiSearch /> : ''}
    </InputSearchPropertyDiv>
  );
};

export default InputSearchProperty;
