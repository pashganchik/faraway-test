import React from 'react';
import Header from '../../shared/Header/Header';

import './PersonPage.scss';

const PersonPage = (): React.ReactElement => {
  return (
    <div className="person-page">
      <Header textId="header-text-person" />

      <div className="person-page__content"></div>
    </div>
  );
};

export default PersonPage;
