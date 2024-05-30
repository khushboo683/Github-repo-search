import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortField = ({ onSortChange, sortField, isSortFieldDisabled }) => {
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel  id="sort-label">Sort By</InputLabel>
      <Select
      disabled={isSortFieldDisabled}
       id="sort-label"
      value={sortField}
        onChange={(e) => onSortChange(e.target.value)}
        label="Sort By"
      >
        <MenuItem value="stars">Stars</MenuItem>
        <MenuItem value="watchers_count">Watchers Count</MenuItem>
        <MenuItem value="score">Score</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="created_at">Created At</MenuItem>
        <MenuItem value="updated_at">Updated At</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortField;
