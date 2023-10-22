import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    render(<App />);
  })

  it('should render the appbar properly', () => {
    const appbar = screen.getByTestId('appbar');
    const logo = screen.getByTestId('appbar-logo');
    const search = screen.getByTestId('search-bar');
    const title = screen.getByTestId('appbar-title');

    expect(appbar).toBeVisible();
    expect(logo).toBeVisible();
    expect(title.textContent).toEqual('Weather Forecast')
    expect(search).toBeVisible();
  });

  it('should render the weather card section', () => {
    const weatherCard = screen.getByTestId('current-weather-section');

    expect(weatherCard).toBeVisible();
  });

  it('should render the daily forecast section', () => {
    const dailyForecast = screen.getByTestId('daily-forecast-section');

    expect(dailyForecast).toBeVisible();
  });
});
