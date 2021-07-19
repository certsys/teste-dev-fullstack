import React from 'react';
import { TextPropertyDiv } from './TextPropertyDiv';

const TextProperty = (): JSX.Element => {
  return (
    <TextPropertyDiv>
      <input type="text" />
    </TextPropertyDiv>
  );
};

export default React.memo(TextProperty);
