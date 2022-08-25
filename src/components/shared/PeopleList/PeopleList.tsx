import React, { Dispatch, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { selectError, selectPersons, selectLoading } from '../../../redux/selectors';
import { IRootState, ICustomFilter, IPerson } from '../../../utils/types';
import { getPeople } from '../../../redux/actions';
import { Const } from '../../../utils/const';

import './PeopleList.scss';

const PeopleList = (props: IPeopleListProps): React.ReactElement => {
  const { people, isLoading, error, getPeople } = props;
  const intl = useIntl();

  useEffect(() => {
    getPeople(0);
  }, []);

  const hasData = people && people.length > 0;

  return (
    <div className="people-list">
      {isLoading && (
        <span>
          <FormattedMessage id="loading" />
        </span>
      )}

      {!hasData && !isLoading && (
        <span>
          <FormattedMessage id="no-data" />
        </span>
      )}

      {hasData &&
        !isLoading &&
        people.map((person, i) => {
          return <div key={i} className="person-item"></div>;
        })}
    </div>
  );
};

interface IPropsState {
  people: IPerson[];
  isLoading: boolean;
  error: string | undefined;
}
const mapStateToProps = (state: IRootState) => {
  return {
    people: selectPersons(state),
    isLoading: selectLoading(state),
    error: selectError(state),
  };
};

interface IPropsDispatch {
  getPeople: (page: number) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getPeople: (page: number): void => dispatch(getPeople({ page })),
  };
};

interface IPropsOwn {}

type IPeopleListProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
