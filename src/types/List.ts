import { Main } from './Main';
import { Weather } from './Weather';
import { Wind } from './Wind';
import { Clouds } from './Clouds';

export type List = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
};