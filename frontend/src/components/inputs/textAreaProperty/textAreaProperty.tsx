import React, { useContext } from 'react';
import { PropertyAddModel } from '../../../models/property';
import MainContext from '../../../store/MainContext';
import { TextAreaPropertyDiv } from './textAreaPropertyDiv';

const TextAreaProperty = (props: PropertyAddModel): JSX.Element => {
  const context = useContext(MainContext);

  function changeValue(value: string) {
    context?.setState({
      ...context.state,
      [props.field]: value,
    });
  }

  return (
    <TextAreaPropertyDiv className="property-text-area">
      <textarea
        value={props.value}
        onChange={evt => changeValue(evt.target.value)}
      />
    </TextAreaPropertyDiv>
  );
};

export default React.memo(TextAreaProperty);
