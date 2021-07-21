import React, { useContext, useEffect } from 'react';

import { quantProperty } from '../../models/types';
import MainContext from '../../store/MainContext';
import InpurPagination from './InputPagination';
import { PaginationDiv } from './PaginationDiv';

const Pagination = (): JSX.Element => {
  const context = useContext(MainContext);

  useEffect(() => {
    fetch(
      `http://localhost:5050/api/properties?&search=${context?.state.searchTerm}`,
    )
      .then(res => res.json())
      .then(data => {
        const result = Math.ceil(data.length / context?.state.limit);
        context?.setState({
          ...context.state,
          quantPage: result,
        });
      })
      .catch(err => {});
  }, [
    context?.state.quantProperty,
    context?.state.searchTerm,
    context?.state.page,
  ]);

  const quantPage = context?.state.quantPage;

  function render() {
    let inputs = [];
    for (let i = 1; i <= quantPage; i++) {
      inputs.push(<InpurPagination quant={i} />);
    }
    return inputs;
  }

  return <PaginationDiv>{render().map(e => e)}</PaginationDiv>;
};

export default Pagination;
