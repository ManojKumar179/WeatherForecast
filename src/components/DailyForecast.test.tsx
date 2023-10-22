import { render, screen, fireEvent } from '@testing-library/react';

import { DailyForecast } from './DailyForecast';
import { Forecast } from '../types/Forecast';

describe('<DailyForecast />', () => {
  const props = {
    loading: false,
    data: {
      cod: '200',
      message: 0,
      cnt: 2,
      city: {
        id: 1258932,
        name: 'Rajahmundry',
        coord: {
          lat: 16.9833,
          lon: 81.7833
        },
        country: 'IN',
        population: 304804,
        timezone: 19800,
        sunrise: 1697934430,
        sunset: 1697976443
      },
      list: [
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
        },
        {
          dt: 1698084000,
          main: {
              temp: 23.02,
              feels_like: 23.26,
              temp_min: 23.02,
              temp_max: 23.02,
              pressure: 1011,
              sea_level: 1011,
              grnd_level: 1008,
              humidity: 72,
              temp_kf: 0
          },
          weather: [
              {
                  id: 804,
                  main: 'Clouds',
                  description: 'overcast clouds',
                  icon: '04n'
              }
          ],
          clouds: {
              all: 100
          },
          wind: {
              speed: 1.51,
              deg: 43,
              gust: 1.66
          },
          visibility: 10000,
          pop: 0,
          sys: {
              pod: 'n'
          },
          dt_txt: '2023-10-23 18:00:00'
        }
      ]
    } as Forecast,
  };

  let reRender: (ui: React.ReactElement) => void;

  beforeEach(() => {
    const { rerender } = render(<DailyForecast {...props} />);
    reRender = rerender;
  });

  it('should render the daily forecast section', () => {
    const dailyForecastSection = screen.getByTestId('daily-forecast-card');

    expect(dailyForecastSection).toBeVisible();
  });

  it('should show loader when loading prop is true', () => {
    reRender(<DailyForecast data={null} loading={true} />);

    const loader = screen.getByTestId('loader');

    expect(loader).toBeVisible();
  });

  it('should not render Loader when loading is false', () => {
    const newProps = {
      ...props,
      loading: false,
    }
    reRender(<DailyForecast {...newProps} />);

    const loader = screen.queryByTestId('loader');

    expect(loader).not.toBeInTheDocument();
  });

  it('should have title on proper render', () => {
    const title = screen.getByTestId('daily-forecast-title');

    expect(title.textContent).toEqual('Daily Forecast');
  });

  it('should have 2 accordions in daily forecast', () => {
    const accordions = screen.queryAllByTestId('daily-forecast-accordion');

    expect(accordions.length).toEqual(2);
  });

  it('should have proper Accordion Summary', () => {
    const accordionSummaryDates = screen.queryAllByTestId('daily-forecast-accordion-summary-date');
    const accordionSummaryDays = screen.queryAllByTestId('daily-forecast-accordion-summary-day');

    expect(accordionSummaryDates[0].textContent).toEqual('10/22');
    expect(accordionSummaryDates[1].textContent).toEqual('10/23');

    expect(accordionSummaryDays[0].textContent).toEqual('Sunday');
    expect(accordionSummaryDays[1].textContent).toEqual('Monday');
  });

  it('should render Accordion Details of the clicked one', () => {
    const accordionSummaryDays = screen.queryAllByTestId('daily-forecast-accordion-summary-day');
    fireEvent.click(accordionSummaryDays[0])

    expect(screen.queryAllByTestId('daily-forecast-accordion-details')[0]).toBeVisible();
    expect(screen.queryAllByTestId('daily-forecast-accordion-details')[1]).not.toBeVisible();
  })
});
