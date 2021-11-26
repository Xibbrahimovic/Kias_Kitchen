import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      color="primary"
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      endIcon={<LogoutIcon/>}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      LOGOUT
    </Button>
  );
}

export default LogOutButton;
