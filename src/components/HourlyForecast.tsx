import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { List } from '../types/List';

type HourlyForecastProps = {
  data: List[];
}

export const HourlyForecast = ({ data }: HourlyForecastProps) => {
  
  const getHumanReadableTime = (val : string) => {
    const newDate = new Date(val);

    return newDate.toLocaleTimeString('en', { timeStyle: 'short' });
  }

  return (
    <Grid container columnGap={2} flexWrap={'nowrap'} overflow='auto' justifyContent='space-between' data-testid='hourly-forecast-section'>
      {data.map(
        (item: List, index: number) => {
          return (
            <Grid item key={index}>
              <Stack>
                <Grid item>
                  <Typography fontSize={14} data-testid='hourly-forecast-item-temperature'>{`${Math.round(item.main.temp)}°C`}</Typography>
                </Grid>
                <Grid item>
                  <CardMedia
                    component='img'
                    alt={item.weather[0].main}
                    height='40'
                    width='40'
                    image={`icons/${item.weather[0].icon}.png`}
                    data-testid='hourly-forecast-item-img'
                  />
                </Grid>
                <Grid item>
                  <Typography fontSize={10} data-testid='hourly-forecast-item-time'>{getHumanReadableTime(item.dt_txt)}</Typography>
                </Grid>
              </Stack>
            </Grid>
          )
        }
      )}
    </Grid>
  )
};
