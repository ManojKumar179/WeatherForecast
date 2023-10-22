import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

import { WeatherCard } from './components/WeatherCard';
import { SearchField } from './components/SearchField';
import { useFetch } from './hooks/useFetch'
import { Forecast, CurrentWeather } from './models/Forecast';
import { DailyForecast } from './components/DailyForecast';

const cityName = 'Rajahmundry,IN';
const key = '448bc5c8767f2c2a1bbfb5317a9274c4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [city, setCity] = useState<string>(cityName)
  const currentWeatherResponse = useFetch<CurrentWeather>(`${BASE_URL}/weather?appid=${key}&q=${city}&units=metric`)
  const forecastResponse = useFetch<Forecast>(`${BASE_URL}/forecast?q=${city}&appid=${key}&units=metric`);

  const handleOnSearch = (val: string) => {
    setCity(val)
  };

  return (
    <Container sx={{ height: '100vh', backgroundColor: 'lightblue' }} disableGutters>
      <AppBar position='static' data-testid='appbar'>
        <Toolbar>
          <FilterDramaIcon fontSize={'large'} sx={{ marginRight: 2 }} data-testid='appbar-logo'/>
          <Typography variant='h4' data-testid='appbar-title'>
            Weather Forecast
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchField onSearch={handleOnSearch} data-testid='appbar-search' />
        </Toolbar>
      </AppBar>
      <Grid container marginTop={2} gap={4} sx={{ justifyContent: 'center'  }}>
        <Grid item xs={4} data-testid='current-weather-section'>
          <WeatherCard
            data={currentWeatherResponse.data}
            loading={currentWeatherResponse.loading}
          />
        </Grid>
        <Grid item xs={6} data-testid='daily-forecast-section'>
          <DailyForecast data={forecastResponse.data} loading={forecastResponse.loading} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
