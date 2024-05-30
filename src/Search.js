import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  const handleSearch = () => {
    if (query.trim() === '') {
        setError(true);
      } else {
        setError(false);
        onSearch(query);
      }
  };
const handleChange=(e)=>{
    setError(false);
    setQuery(e.target.value)
}

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField 
        variant="outlined" 
        label="Search Repositories *" 
        value={query} 
        onChange={handleChange} 
        error={error}
        helperText={error ? 'Search field is required' : ''}
        fullWidth 
      />
      <Button variant="contained" color="primary" onClick={handleSearch} disabled={query==''?true:false}>
        Search
      </Button>
    </Box>
  );
};

export default Search;
