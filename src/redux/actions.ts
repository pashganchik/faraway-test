import { Action, AnyAction } from 'redux';
import { ICustomFilter } from '../utils/types';

export const GET_PEOPLE = 'GET_PEOPLE';
export const GET_PEOPLE_DONE = 'GET_PEOPLE_DONE';

export const GET_PERSON = 'GET_PERSON';
export const GET_PERSON_DONE = 'GET_PERSON_DONE';

export const SET_WORK_MODE = 'SET_WORK_MODE';

//////////////////////////////////////////////////////////////////////
// interfaces
//////////////////////////////////////////////////////////////////////

export interface ICustomAction<T> extends Action<string> {
  type: string;
  data: T;
}

//////////////////////////////////////////////////////////////////////

export interface IGetPeopleProps {
  page: number;
}

export function getPeople(data: IGetPeopleProps): ICustomAction<IGetPeopleProps> {
  return { type: GET_PEOPLE, data };
}

export interface IGetPersonProps {
  personId: number;
}

export function getPerson(data: IGetPersonProps): ICustomAction<IGetPersonProps> {
  return { type: GET_PERSON, data };
}
