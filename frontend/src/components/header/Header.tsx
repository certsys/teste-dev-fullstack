import React from 'react';

import logo from '../../assets/images/logo.png';
import Navigation from '../navigation/Navgation';
import { HeaderDiv } from './HeaderDiv';

const Header = (): JSX.Element => {
  return (
    <HeaderDiv>
      <div className="top">
        <h1>CertImóveis Classificados</h1>
        <div className="logo">
          <a href="https://devjes.com.br/" target="_blank">
            <img src={logo.src} alt="DEVJes" />
          </a>
        </div>
      </div>
      <Navigation />
    </HeaderDiv>
  );
};

export default Header;
