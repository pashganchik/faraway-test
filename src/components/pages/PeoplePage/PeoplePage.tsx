import React from 'react';
import PeopleList from '../../shared/PeopleList/PeopleList';
import Header from '../../shared/Header/Header';

import './PeoplePage.scss';

const PeoplePage = (): React.ReactElement => {
  return (
    <div className="people-page">
      <Header textId="header-text-people" />
      <div className="people-page__content">
        <PeopleList />
      </div>
    </div>
  );
};

export default PeoplePage;
