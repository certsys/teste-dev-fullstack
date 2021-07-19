import React from 'react';

import logo from '../../assets/images/logo.png';
import { FooterDiv } from './FooterDiv';

const Footer = (): JSX.Element => {
  return (
    <FooterDiv>
      <span>CertImóveis - Todos os direitos reservados.</span>

      <div className="logo">
        <a href="http://devjes.com.br/" target="_blank">
          <img src={logo.src} alt="DEVJes" />
        </a>
      </div>
    </FooterDiv>
  );
};

export default Footer;
