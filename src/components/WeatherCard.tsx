import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

import { CurrentWeather } from '../types/CurrentWeather';
import { Loader } from './Loader';
import { Error } from './Error';

type WeatherCardProps = {
  data: CurrentWeather | null;
  loading: boolean;
  error: boolean;
}

export const WeatherCard = ({ data, loading, error }: WeatherCardProps) => {
  return (
   <Card sx={{ width: '400px', borderRadius: 3,  minHeight: '400px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} data-testid='current-weather-card'>
    {loading && <Loader size={40} />}
    {error && data?.cod !== 200 && <Error message='City Not Found'/>}
    {!loading && !error && (
      <CardContent sx={{ paddingX: 4 }}>
        <Grid container sx={{
          justifyContent: 'space-between',
        }}>
          <Grid item>
              <Typography variant='h2' data-testid='current-temperature'>
                <Box data-testid='degrees'>
                  {data
                    ? (
                      <>
                        <Typography variant='inherit' fontSize={12} letterSpacing={1} data-testid='now-label'>Now</Typography>
                          {`${Math.round(data.main.temp)}°C`}
                          <Typography variant='inherit' fontWeight={100} fontSize={24} sx={{ display: 'inline' }}>
                            {` | ${data.weather[0].main }`}
                          </Typography>
                      </>
                    )
                    : '--'
                  }
                </Box>
                <Typography fontSize={14} color='gray' marginTop={1} data-testid='city'>
                  {data ? `${data.name}, ${data.sys.country}`: '--'}
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              {data && <CardMedia
                component='img'
                alt={data.weather[0].main}
                height='60'
                image={`icons/${data.weather[0].icon}.png`}
              />}
            </Grid>
        </Grid>
        <Box>
          <Typography fontSize={14} paddingY={4}>Weather Info</Typography>
          <Grid container rowGap={3} columnGap={4}>
            <Grid item xs={5}>
              <Grid container>
                <Grid item>
                  <WbSunnyOutlinedIcon fontSize='large' data-testid='sunset-icon'/>
                </Grid>
                <Grid item>
                  <Stack>
                    <Typography marginX={2} fontSize={14} data-testid='sunset-value'>
                      {`${data ? new Date(data.sys.sunset * 1000).toLocaleTimeString('en', { timeStyle: 'short' }) : '--'}`}
                    </Typography>
                    <Typography marginX={2} fontSize={14} data-testid='sunset-label'>
                      Sunset
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item>
                  <WaterDropOutlinedIcon fontSize='large' data-testid='humidity-icon'/>
                </Grid>
                <Grid item>
                  <Stack>
                    <Typography marginX={2} fontSize={14} data-testid='humidity-value'>
                      {`${data?.main.humidity ?? '--'}`}
                    </Typography>
                    <Typography marginX={2} fontSize={14} data-testid='humidity-label'>
                      Humidity
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item>
                  <AirOutlinedIcon fontSize='large' data-testid='wind-icon'/>
                </Grid>
                <Grid item>
                  <Stack>
                    <Typography marginX={2} fontSize={14} data-testid='wind-value'>
                      {`${data?.wind.speed ?? '--'}`}
                    </Typography>
                    <Typography marginX={2} fontSize={14} data-testid='wind-label'>
                      Wind
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item>
                  <SpeedOutlinedIcon fontSize='large' data-testid='pressure-icon'/>
                </Grid>
                <Grid item>
                  <Stack>
                    <Typography marginX={2} fontSize={14} data-testid='pressure-value'>
                      {`${data?.main.pressure ?? '--'}`}
                    </Typography>
                    <Typography marginX={2} fontSize={14} data-testid='pressure-label'>
                      Pressure
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, flexDirection: 'column' }}>
            <Typography fontSize={14} data-testid='feels-like-section'>
              Feels Like: {data ? `${Math.round(data.main.feels_like)}°C` : '--'}
            </Typography>
            <Typography fontSize={14} data-testid='visibility-section'>
              Visibility: {data ? `${Math.round(data.visibility)}` : '--'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      )}
   </Card>
  )
};