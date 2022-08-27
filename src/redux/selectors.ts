import { IRootState, IPerson, IPersonFull } from '../utils/types';

/////////////////////////////////////////////////////////////

export const selectPersonsCount = (state: IRootState): number | undefined => state.data.personsCount;
export const selectPersons = (state: IRootState): IPerson[] => state.data.persons;
export const selectPerson = (state: IRootState): IPersonFull | undefined => state.data.person;

export const selectLoading = (state: IRootState): boolean => state.data.loading;
export const selectError = (state: IRootState): string | undefined => state.data.error;
