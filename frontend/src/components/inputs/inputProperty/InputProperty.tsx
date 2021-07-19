import React from 'react';
import { InputPropertyDiv } from './InputPropertyDiv';

const InputProperty = (): JSX.Element => {
  return (
    <InputPropertyDiv className="property-input">
      <input type="text" />
    </InputPropertyDiv>
  );
};

export default React.memo(InputProperty);
