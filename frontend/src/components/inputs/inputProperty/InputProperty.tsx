import React, { useContext } from 'react';
import { PropertyAddModel } from '../../../models/property';
import MainContext from '../../../store/MainContext';
import { InputPropertyDiv } from './InputPropertyDiv';

const InputProperty = (props: PropertyAddModel): JSX.Element => {
  const context = useContext(MainContext);

  function changeValue(value: string) {
    context?.setState({
      ...context.state,
      [props.field]: value,
    });
  }

  return (
    <InputPropertyDiv className="property-input">
      <input
        value={props.value}
        type={props.type ? props.type : 'text'}
        onChange={evt => changeValue(evt.target.value)}
      />
    </InputPropertyDiv>
  );
};

export default React.memo(InputProperty);
