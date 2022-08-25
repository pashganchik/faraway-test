import { put, takeLatest, all, call, delay } from 'redux-saga/effects';
import { GET_PEOPLE, GET_PEOPLE_DONE, GET_PERSON, GET_PERSON_DONE } from './actions';
import { IPerson, IPersonFull, IResponseEntities } from '../utils/types';
import { Const } from '../utils/const';

//////////////////////////////////////////////////////////////////////////////

const prepareHeaders = (): HeadersInit => {
  const headers: HeadersInit = new Headers();

  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');

  return headers;
};

async function callApi(url: string, params: { [key: string]: any }): Promise<any> {
  const response = await fetch(url, params);
  return await response.json();
}

async function callPromise(promise: any, params: { [key: string]: any }): Promise<any> {
  return await promise(params);
}

//////////////////////////////////////////////////////////////////////////////

function* fetchPeople(data: any) {
  const { page } = data.data;
  const headers: HeadersInit = prepareHeaders();
  const params = { method: 'GET', headers };

  const url = `${Const.ApiBaseUrl}/people/?page=${page || 1}`;

  const response: IResponseEntities = yield call(callApi, url, params);
  const persons = response.results as IPerson[];

  yield put({
    type: GET_PEOPLE_DONE,
    persons,
  });
}

function* fetchPerson(data: any) {
  const { personId } = data.data;
  const headers: HeadersInit = prepareHeaders();
  const params = { method: 'GET', headers };

  const url = `${Const.ApiBaseUrl}/people/${personId}`;

  const person: IPerson[] = yield call(callApi, url, params);

  yield put({
    type: GET_PERSON_DONE,
    person,
  });
}

//////////////////////////////////////////////////////////////////////

function* actionWatcher() {
  yield takeLatest(GET_PEOPLE, fetchPeople);
  yield takeLatest(GET_PERSON, fetchPerson);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
