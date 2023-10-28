import { List } from './List';
import { City } from './City';

export type Forecast = {
  cod: string;
  message: number | string;
  cnt: number;
  list: List[];
  city: City;
};
