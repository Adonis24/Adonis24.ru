import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function TextInput(props) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0, width: "180px" },
      }}
      noValidate
      autoComplete="off"
      className={'challenge'}
    >
      <div>
        <TextField id="outlined-basic" label={props.label} variant="outlined" />
      </div>
    </Box>
  );
}

export default TextInput;