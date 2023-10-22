import { List } from './List';
import { City } from './City';

export type Forecast = {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
};
