import { IPerson } from './types';

const KEY = 'FARAWAY_DB';

const getPeopleFromLocal = (): IPerson[] => {
  const peopleDb: IPerson[] = JSON.parse(localStorage.getItem(KEY) || '[]');
  return peopleDb;
};

const savePeopleToLocal = (people: IPerson[]): void => {
  localStorage.setItem(KEY, JSON.stringify(people));
};

/**
 * Utility to work with Local Storage
 */
export const localDb = {
  savePeopleToLocal: (people: IPerson[]): void => {
    savePeopleToLocal(people);
  },

  savePersonToLocal: (person: IPerson): void => {
    const peopleDb = getPeopleFromLocal();
    const idx = peopleDb.findIndex((x) => x.url === person.url);
    if (idx >= 0) {
      peopleDb[idx] = person;
    } else {
      peopleDb.push(person);
    }
    savePeopleToLocal(peopleDb);
  },

  getPeopleFromLocal: (): IPerson[] => {
    return getPeopleFromLocal();
  },

  getPersonFromLocal: (url: string): IPerson | undefined => {
    const peopleDb = getPeopleFromLocal();
    const idx = peopleDb.findIndex((x) => x.url === url);

    return idx >= 0 ? peopleDb[idx] : undefined;
  },
};
