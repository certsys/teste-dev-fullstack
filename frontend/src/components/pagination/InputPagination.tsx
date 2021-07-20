import React, { useContext, useEffect } from 'react';

import MainContext from '../../store/MainContext';

const InpurPagination = (props: any): JSX.Element => {
  const context = useContext(MainContext);

  function changePage(value: number) {
    context?.setState({
      ...context.state,
      page: value,
    });
  }

  return (
    <input
      type="button"
      value={props.quant}
      onClick={() => changePage(props.quant)}
    />
  );
};

export default InpurPagination;
