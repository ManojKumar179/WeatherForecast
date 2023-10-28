import { useState, SyntheticEvent, useMemo } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Forecast } from '../types/Forecast';
import { List } from '../types/List';
import { HourlyForecast } from './HourlyForecast';
import { Loader } from './Loader';
import { Error } from './Error';

type DailyForecastProps = {
  data: Forecast | null;
  loading: boolean;
  error: boolean;
}

export const DailyForecast = ({ data, loading, error }: DailyForecastProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const modifedData = useMemo(() => data?.list?.reduce((acc: { [key: string]: List[]}, curr: List) => {
    const date = new Date(curr.dt_txt).toLocaleDateString('en', {
      dateStyle: 'short'
    });

    if (Object.keys(acc).includes(date)) {
      acc[date] = [...acc[date], curr];
    } else {
      acc[date] = [curr];
    }

    return acc;
  }, {}) ?? {}, [data]);

  return (
    <Card sx={{ display: 'flex', borderRadius: 3, justifyContent: 'center', alignItems: 'center', minHeight: '400px' }} data-testid='daily-forecast-card'>
      {loading && <Loader size={40}/>}
      {error && <Error message='City Not Found' />}
      {!loading && !error && <CardContent>
        <Typography variant='h6' paddingBottom={2} data-testid='daily-forecast-title'>
          Daily Forecast
        </Typography>
        {
          Object.keys(modifedData).map((key, index) => {
            const day = new Date(key).toLocaleDateString('en', { weekday: 'long' });

            return (
              <Accordion key={index} expanded={expanded === 'day' + index} onChange={handleChange('day' + index)} data-testid='daily-forecast-accordion'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  data-testid='daily-forecast-accordion-summary'
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }} data-testid='daily-forecast-accordion-summary-date'>
                    {`${key.slice(0, 5)}`}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }} data-testid='daily-forecast-accordion-summary-day'>{day}</Typography>
                </AccordionSummary>
                <AccordionDetails data-testid='daily-forecast-accordion-details'>
                  <HourlyForecast data={modifedData[key]} />
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </CardContent>}
    </Card>
  );
};