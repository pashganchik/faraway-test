export interface IRootState {
  data: IDataState;
}

export interface IDataState {
  personsCount: number | undefined;
  persons: IPerson[];
  person: IPersonFull | undefined;
  loading: boolean;
  error: string | undefined;
}

/////////////////// ### Types by https://swapi.dev/api ### //////////////////////////

export interface IResponseEntities {
  count: number;
  next: TUrlPath | null;
  previous: TUrlPath | null;
  results: any;
}

export interface IEntity {
  name: string;
  created: string;
  edited: string;
  url: TUrlPath;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  HERMAPHRODITE = 'hermaphrodite',
  NA = 'n/a',
}

export type TColor = string;

export type TUrlPath = string;

export interface IPerson {
  name: string;
  height: number;
  mass: number;
  hair_color: TColor;
  skin_color: TColor;
  eye_color: TColor;
  birth_year: string;
  gender: Gender;
  homeworld: TUrlPath;
  films: TUrlPath[];
  species: TUrlPath[];
  vehicles: TUrlPath[];
  starships: TUrlPath[];
  created: string;
  edited: string;
  url: TUrlPath;
}

export interface IPersonFull extends IPerson {
  homeworldFull: IEntity;
  filmsFull: IEntity[];
  speciesFull: IEntity[];
  vehiclesFull: IEntity[];
  starshipsFull: IEntity[];
}

/////////////////////////////////////////////////////////////////////////////////

export interface ICustomFilter {
  text: string;
}
