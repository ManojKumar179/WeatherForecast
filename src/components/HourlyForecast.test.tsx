import { render, screen } from '@testing-library/react';

import { HourlyForecast } from './HourlyForecast';
import { List } from '../types/List';

describe('<HourlyForecast />', () => {
  const props = {
    data: [
      {
        dt: 1697997600,
        main: {
          temp: 26.66,
          feels_like: 26.66,
          temp_min: 23.71,
          temp_max: 26.66,
          pressure: 1011,
          sea_level: 1011,
          grnd_level: 1010,
          humidity: 79,
          temp_kf: 2.95
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 60
        },
        wind: {
          speed: 0.5,
          deg: 105,
          gust: 0.71
        },
        visibility: 10000,
        pop: 0.05,
        dt_txt: '2023-10-22 18:00:00'
      }
    ] as List[]
  }

  beforeEach(() => {
    render(<HourlyForecast {...props} />)
  })

  it('should render the hourly forecast section', () => {
    const section = screen.getByTestId('hourly-forecast-section');

    expect(section).toBeVisible();
  });

  it('should render proper tempature for hourly forecast item', () => {
    const temp = screen.getByTestId('hourly-forecast-item-temperature');

    expect(temp.textContent).toEqual(`${Math.round(props.data[0].main.temp)}°C`);
  });

  it('should render the image in hourly forecast section', () => {
    const img = screen.getByAltText(`${props.data[0].weather[0].main}`);

    expect(img).toBeVisible();
  });

  it('should render proper tempature for hourly forecast item', () => {
    const temp = screen.getByTestId('hourly-forecast-item-time');

    expect(temp.textContent).toEqual('6:00 PM');
  });
});
