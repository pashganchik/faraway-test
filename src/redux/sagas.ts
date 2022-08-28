import { put, takeLatest, all, call } from 'redux-saga/effects';
import { GET_PEOPLE, GET_PEOPLE_DONE, GET_PERSON, GET_PERSON_DONE } from './actions';
import { IEntity, IPerson, IPersonFull, IResponseEntities } from '../utils/types';
import { Const } from '../utils/const';
import { localDb } from '../utils/db';
import { mergePerson, mergePersons } from '../utils/window';

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

//////////////////////////////////////////////////////////////////////////////

function* fetchPeople(data: any) {
  const { page } = data.data;
  const headers: HeadersInit = prepareHeaders();
  const params = { method: 'GET', headers };

  const url = `${Const.ApiBaseUrl}/people/?page=${(page || 0) + 1}`;

  const response: IResponseEntities = yield call(callApi, url, params);
  const persons = response.results as IPerson[];
  const personsDb = localDb.getPeopleFromLocal();
  mergePersons(personsDb, persons);

  const personsCount = response.count;

  yield put({
    type: GET_PEOPLE_DONE,
    persons,
    personsCount,
  });
}

function* fetchPerson(data: any) {
  const { personId } = data.data;
  const headers: HeadersInit = prepareHeaders();
  const params = { method: 'GET', headers };

  const url = `${Const.ApiBaseUrl}/people/${personId}`;

  const person: IPersonFull = yield call(callApi, url, params);
  const personDb = localDb.getPersonFromLocal(person.url);
  mergePerson(personDb, person);

  const planet: IEntity = yield call(callApi, person.homeworld, params);
  person.homeworldFull = planet;

  const callFilms = person.films.map((x) => call(callApi, x, params));
  const films: IEntity[] = yield all(callFilms);
  person.filmsFull = films;

  const callSpecies = person.species.map((x) => call(callApi, x, params));
  const species: IEntity[] = yield all(callSpecies);
  person.speciesFull = species;

  const callVehicles = person.vehicles.map((x) => call(callApi, x, params));
  const vehicles: IEntity[] = yield all(callVehicles);
  person.vehiclesFull = vehicles;

  const callStarships = person.starships.map((x) => call(callApi, x, params));
  const starships: IEntity[] = yield all(callStarships);
  person.starshipsFull = starships;

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
