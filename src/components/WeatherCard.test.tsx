import { render, screen } from '@testing-library/react';

import { WeatherCard } from './WeatherCard';
import { CurrentWeather } from '../types/CurrentWeather';

describe('<WeatherCard />', () => {
  const props = {
    data: {
      coord: {
        lon: 81.7833,
        lat: 16.9833,
      },
      weather: [
        {
          id: 721,
          main: 'Haze',
          description: 'haze',
          icon: '50d'
        }
      ],
      base: 'stations',
      main: {
        temp: 34.13,
        feels_like: 38.34,
        temp_min: 34.13,
        temp_max: 34.13,
        pressure: 1012,
        humidity: 49
      },
      visibility: 5000,
      wind: {
        speed: 3.09,
        deg: 320,
      },
      clouds: {
        all: 20,
      },
      dt: 1697955915,
      sys: {
        type: 1,
        id: 9225,
        country: 'IN',
        sunrise: 1697934430,
        sunset: 1697976443
      },
      timezone: 19800,
      id: 1258932,
      name: 'Rajahmundry',
      cod: '200'
    } as CurrentWeather,
    loading: false,
  };

  let reRender: (ui: React.ReactElement) => void;

  beforeEach(() => {
    const { rerender } = render(<WeatherCard {...props} />);

    reRender = rerender;
  });

  it('should render weather card properly', () => {
    const weatherCard = screen.getByTestId('current-weather-card');

    expect(weatherCard).toBeVisible();
  });

  it('should render Loader when loading is true', () => {
    const newProps = {
      loading: true,
      data: null,
    };
    
    reRender(<WeatherCard {...newProps} />);

    const loader = screen.getByTestId('loader');

    expect(loader).toBeVisible();
  });

  it('should not render Loader when loading is false', () => {
    const newProps = {
      ...props,
      loading: false,
    }
    reRender(<WeatherCard {...newProps} />);

    const loader = screen.queryByTestId('loader');

    expect(loader).not.toBeInTheDocument();
  });

  it('should render Current Temperature Section', () => {
    const tempSection = screen.getByTestId('current-temperature');
    const degrees = screen.getByTestId('degrees');
    const city = screen.getByTestId('city');

    expect(tempSection).toBeVisible();

    expect(degrees.textContent).toEqual(`Now${Math.round(props.data.main.temp)}°C | ${props.data.weather[0].main}`)
    expect(city.textContent).toEqual(`${props.data.name}, ${props.data.sys.country}`);
  });

  it('should render Current Temperature Section with No data', () => {
    reRender(<WeatherCard data={null} loading={false} />);

    const degrees = screen.getByTestId('degrees');
    const city = screen.getByTestId('city');

    expect(degrees.textContent).toEqual('--');
    expect(city.textContent).toEqual('--');
  })

  it('should render Current Temperature related Image', () => {
    const img = screen.getByAltText(`${props.data.weather[0].main}`);

    expect(img).toBeVisible();
  });

  it('should render proper weather info', () => {
    const sunsetIcon = screen.getByTestId('sunset-icon');
    const sunsetLabel = screen.getByTestId('sunset-label');
    const sunsetValue = screen.getByTestId('sunset-value');

    const humidityIcon = screen.getByTestId('humidity-icon');
    const humidityLabel = screen.getByTestId('humidity-label');
    const humidityValue = screen.getByTestId('humidity-value');

    const windIcon = screen.getByTestId('wind-icon');
    const windLabel = screen.getByTestId('wind-label');
    const windValue = screen.getByTestId('wind-value');

    const pressureIcon = screen.getByTestId('pressure-icon');
    const pressureLabel = screen.getByTestId('pressure-label');
    const pressureValue = screen.getByTestId('pressure-value');

    expect(sunsetIcon).toBeVisible();
    expect(sunsetLabel.textContent).toEqual('Sunset');
    expect(humidityValue.textContent).toEqual(`${props.data.main.humidity}`);

    expect(humidityIcon).toBeVisible();
    expect(humidityLabel.textContent).toEqual('Humidity');
    expect(sunsetValue.textContent).toEqual(new Date(props.data.sys.sunset * 1000).toLocaleTimeString('en', { timeStyle: 'short' }));

    expect(windIcon).toBeVisible();
    expect(windLabel.textContent).toEqual('Wind');
    expect(windValue.textContent).toEqual(`${props.data.wind.speed}`);

    expect(pressureIcon).toBeVisible();
    expect(pressureLabel.textContent).toEqual('Pressure');
    expect(pressureValue.textContent).toEqual(`${props.data.main.pressure}`);
  });

  it('should render empty weather info when data is null', () => {
    const newProps = {
      loading: false,
      data: null,
    };
    
    reRender(<WeatherCard {...newProps} />);

    const sunsetIcon = screen.getByTestId('sunset-icon');
    const sunsetLabel = screen.getByTestId('sunset-label');
    const sunsetValue = screen.getByTestId('sunset-value');

    const humidityIcon = screen.getByTestId('humidity-icon');
    const humidityLabel = screen.getByTestId('humidity-label');
    const humidityValue = screen.getByTestId('humidity-value');

    const windIcon = screen.getByTestId('wind-icon');
    const windLabel = screen.getByTestId('wind-label');
    const windValue = screen.getByTestId('wind-value');

    const pressureIcon = screen.getByTestId('pressure-icon');
    const pressureLabel = screen.getByTestId('pressure-label');
    const pressureValue = screen.getByTestId('pressure-value');

    expect(sunsetIcon).toBeVisible();
    expect(sunsetLabel.textContent).toEqual('Sunset');
    expect(humidityValue.textContent).toEqual('--');

    expect(humidityIcon).toBeVisible();
    expect(humidityLabel.textContent).toEqual('Humidity');
    expect(sunsetValue.textContent).toEqual('--');

    expect(windIcon).toBeVisible();
    expect(windLabel.textContent).toEqual('Wind');
    expect(windValue.textContent).toEqual('--');

    expect(pressureIcon).toBeVisible();
    expect(pressureLabel.textContent).toEqual('Pressure');
    expect(pressureValue.textContent).toEqual('--');
  });
});
