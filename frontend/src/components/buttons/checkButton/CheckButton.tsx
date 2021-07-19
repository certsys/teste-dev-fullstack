import React from 'react';

import { BsCheckBox } from 'react-icons/bs';
import { CheckButtonButton } from './CheckButtonButton';

const CheckButton = (): JSX.Element => {
  return (
    <CheckButtonButton className="property-check">
      <BsCheckBox />
    </CheckButtonButton>
  );
};

export default React.memo(CheckButton);
