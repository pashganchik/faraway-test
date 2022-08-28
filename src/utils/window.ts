import { IPersonFull, IPerson } from './types';

export const trimTrailingSlashes = (path: string): string => {
  return path.toLowerCase().replace(/(^\/)|(\/$)/g, ''); // trim trailing '/'
};

export const scrollToTop = (): void => {
  window.scrollTo(0, 0);
};

export const pickPerson = (personFull: IPersonFull): IPerson => {
  const { homeworldFull, filmsFull, speciesFull, vehiclesFull, starshipsFull, ...person } = personFull;
  return person as IPerson;
};

export const mergePerson = (source: IPerson | undefined, target: IPerson | undefined): void => {
  if (!source || !target) return;

  Object.keys(source).forEach((key) => (target[key] = source[key]));
};

export const mergePersons = (source: IPerson[] | undefined, target: IPerson[] | undefined): void => {
  if (!source || !target) return;

  for (let i = 0; i < source.length; i++) {
    const sourcePerson = source[i];
    const targetPerson = target.find((x) => x.url === sourcePerson.url);
    mergePerson(sourcePerson, targetPerson);
  }
};
