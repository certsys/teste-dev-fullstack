import React from 'react';
import AddPropertyButton from '../components/buttons/addPropertyButton/AddPropertyButton';
import PropertyRow from '../components/PropertyRow/PropertyRow';

import { HomeSection } from '../styles/pages/Home';

const Home = (): JSX.Element => {
  return (
    <HomeSection>
      <div className="table">
        <div className="table-head">
          <div className="table-name">
            <span>Imóveis</span>
          </div>
          <AddPropertyButton />
        </div>

        <div className="table-body">
          <div className="table-add-row"></div>
          <PropertyRow></PropertyRow>
        </div>
      </div>
    </HomeSection>
  );
};

export default React.memo(Home);
