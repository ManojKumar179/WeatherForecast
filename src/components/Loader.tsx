import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type LoaderProps = {
  size?: number | string;
};

export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <Box sx={{ display: 'flex' }} data-testid='loader'>
      <CircularProgress size={size}/>
    </Box>
  );
}