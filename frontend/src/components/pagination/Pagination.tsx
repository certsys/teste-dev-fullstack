import React from 'react';

import logo from '../../assets/images/logo.png';
import { quantProperty } from '../../models/types';
import Navigation from '../navigation/Navgation';
import { PaginationDiv } from './PaginationDiv';

const Pagination = (props: quantProperty): JSX.Element => {
  console.log(props);
  return (
    <PaginationDiv>
      <input type="button" value="1" />
      <input type="button" value="2" />
      <input type="button" value="3" />
    </PaginationDiv>
  );
};

export default Pagination;
