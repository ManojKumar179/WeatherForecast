import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

type ErrorProps = {
  message: string
};

export const Error = ({ message }: ErrorProps) => {
  return (
    <Grid container justifyContent='center' columnGap={1} data-testid='error-container'>
      <Grid item>
        <ErrorOutlineOutlinedIcon sx={{ color: 'red' }} data-testid='error-icon'/>
      </Grid>
      <Grid item>
        <Typography color='red' data-testid='error-message'>
          {message}
        </Typography>
      </Grid>
    </Grid>
  )
};