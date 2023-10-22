import { Sys } from "./Sys";
import { Clouds } from "./Clouds";
import { Coordinates } from "./Coordinates";
import { Main } from "./Main";
import { Weather } from "./Weather";
import { Wind } from "./Wind";

export type CurrentWeather = {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  id: number;
  timezone: number;
  name: string;
  cod: string;
  sys: Sys;
};