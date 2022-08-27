import { AnyAction, combineReducers } from 'redux';

import { IDataState } from '../utils/types';
import { GET_PEOPLE, GET_PEOPLE_DONE, GET_PERSON, GET_PERSON_DONE } from './actions';

const initialState: IDataState = {
  personsCount: undefined,
  persons: [],
  person: undefined,
  loading: false,
  error: undefined,
};

type InitialStateType = typeof initialState;

const mainReducer = (state = initialState, action: AnyAction): InitialStateType => {
  switch (action.type) {
    case GET_PEOPLE: {
      return { ...state, loading: true, error: undefined };
    }
    case GET_PEOPLE_DONE: {
      const { persons, personsCount } = action;
      return { ...state, persons, personsCount, loading: false };
    }
    case GET_PERSON: {
      return { ...state, loading: true, error: undefined };
    }
    case GET_PERSON_DONE: {
      const { person } = action;
      return { ...state, person, loading: false };
    }

    default:
      return state;
  }
};

export function createReducer(): any {
  return combineReducers({
    data: mainReducer,
  });
}
