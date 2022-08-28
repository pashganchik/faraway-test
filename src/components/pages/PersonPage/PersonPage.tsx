import React from 'react';
import Header from '../../shared/Header/Header';
import PersonForm from '../../shared/PersonForm/PersonForm';

import './PersonPage.scss';

const PersonPage = (): React.ReactElement => {
  return (
    <div className="person-page">
      <Header textId="header-text-person" />
      <PersonForm />
    </div>
  );
};

export default PersonPage;
