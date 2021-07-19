import React from 'react';
import { TextAreaPropertyDiv } from './textAreaPropertyDiv';

const TextAreaProperty = (): JSX.Element => {
  return (
    <TextAreaPropertyDiv className="property-text-area">
      <textarea />
    </TextAreaPropertyDiv>
  );
};

export default React.memo(TextAreaProperty);
