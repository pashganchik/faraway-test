import React, { Dispatch, useState, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import { selectError, selectPersons, selectLoading, selectPersonsCount } from '../../../redux/selectors';
import { IRootState, IPerson } from '../../../utils/types';
import { getPeople } from '../../../redux/actions';
import { Const } from '../../../utils/const';
import PersonItem from './PersonItem';
import { Pager, OnPageChangeEventType } from '../Pager/Pager';
import Loading from '../Loading/Loading';
import NoData from '../NoData/NoData';

import './PeopleList.scss';

const PeopleList = (props: IPeopleListProps): React.ReactElement => {
  const { peopleCount, people, isLoading, getPeople } = props;
  const [page, setPage] = useState(0);
  const [innerPeople, setInnerPeople] = useState(people);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getPeople(page);
  }, [page]);

  useEffect(() => {
    setInnerPeople(people);
  }, [people]);

  const handlePageChange = (e: OnPageChangeEventType): void => {
    if (textRef.current) {
      textRef.current.value = '';
    }
    setPage(e.target.value);
  };

  const handleSearch = (): void => {
    const text = (textRef.current?.value || '').toLowerCase();
    const newInnerPeople = text ? innerPeople.filter((x) => x.name.toLowerCase().indexOf(text) !== -1) : people;
    setInnerPeople(newInnerPeople);
  };

  const pagesCount = useMemo(
    () => (peopleCount ? Math.ceil(peopleCount / Const.PeoplePageSize) : undefined),
    [peopleCount]
  );

  const hasData = people && people.length > 0;

  return (
    <div className="people-list">
      {isLoading && <Loading />}

      {!hasData && !isLoading && <NoData />}

      {hasData && !isLoading && (
        <>
          <div className="people-list-filter">
            Search:
            <Form.Control ref={textRef} type="text" placeholder="type text here ..." />
            <Button onClick={handleSearch}>
              <FaSearch />
            </Button>
          </div>
          <div className="people-list-grid">
            {innerPeople.map((person, idx) => (
              <PersonItem key={idx} person={person} />
            ))}
          </div>
          <div className="people-list-paging">
            <Pager value={page} totalPages={pagesCount} onChange={handlePageChange} />
          </div>
        </>
      )}
    </div>
  );
};

interface IPropsState {
  peopleCount: number | undefined;
  people: IPerson[];
  isLoading: boolean;
  error: string | undefined;
}
const mapStateToProps = (state: IRootState): IPropsState => {
  return {
    peopleCount: selectPersonsCount(state),
    people: selectPersons(state),
    isLoading: selectLoading(state),
    error: selectError(state),
  };
};

interface IPropsDispatch {
  getPeople: (page: number) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IPropsDispatch => {
  return {
    getPeople: (page: number): void => dispatch(getPeople({ page })),
  };
};

interface IPropsOwn {}

type IPeopleListProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
