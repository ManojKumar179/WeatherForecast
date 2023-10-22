import { ChangeEvent, KeyboardEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

type SearchFieldProps = {
  onSearch: (val: string) => void;
}

const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: 2,
  marginRight: 2,
  marginLeft: 0,
  width: '400px',
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: '0px 8px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 0px',
    paddingLeft: `calc(1em + 30px)`,
    transition: theme.transitions.create('width'),
    width: '350px',
  },
}));

export const SearchField = ({ onSearch }: SearchFieldProps) => {
  const [value, setValue] = useState<string>('');
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.trim());
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value !== '') {
      onSearch(value);
    }
  }

  return (
    <Paper elevation={1} sx={{ borderRadius: 2 }} data-testid='search-bar'>
      <Search>
        <SearchIconWrapper data-testid='search-icon'>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search by City Name'
          inputProps={{ 'data-testid': 'search-bar-input' }}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
      </Search>
    </Paper>
  );
};
