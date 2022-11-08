import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setCurrentLanguage } from 'utils/translation';

const LanguageSwitcher = () => {
  const [language, setLanguage] = React.useState('en-US');

  const handleChange = event => {
    setLanguage(event.target.value as string);
    setCurrentLanguage(event.target.value as string);
  };

  return (
    <Box
      sx={{
        marginTop: { xs: '-10px', lg: '20px' },
      }}
    >
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          onChange={handleChange}
          label="Lang"
        >
          <MenuItem value={'en-US'}>EN</MenuItem>
          <MenuItem value={'de'}>DE</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
