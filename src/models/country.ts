import { Currency } from './currency';
import { Language } from './language';
import { RegionalBloc } from './regional-bloc';

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlgn: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: {[key: string]: string };
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
}
