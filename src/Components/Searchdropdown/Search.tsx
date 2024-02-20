import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { padding } from '@mui/system';

const SearchDropdown = (props:any) => {
  const {value,onChange,onSearchChanges,options,placeholder} = props;

  const handleInputChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    onSearchChanges(event,newValue)
  };
  const textStyle = {
    ".MuiOutlinedInput-root": {
      padding:"0px",
      "&.MuiInputBase-colorPrimary": {
        height: "34px",
        borderRadius: "8px",
        border: "1px solid #EBE8EF",
      },
      "& input": {
        padding: "10px 8.12px", // Fix the padding values
      },
      "& fieldset": {
        gap: "5.07px",
      },
    },
  };
  const handleOptionSelected = (event: React.ChangeEvent<{}>, value: string | null) => {
    onChange(event,value);
  };

  return (
    <Autocomplete
      value={value}
      options={options}
      getOptionLabel={(option) => option?.label}
      renderInput={(params) => (
        <TextField {...params} sx={textStyle} placeholder={placeholder?placeholder:"Search"} variant="outlined" />
      )}
      onChange={handleOptionSelected}
      onInputChange={handleInputChange}
    />
  );
};

export default SearchDropdown;
