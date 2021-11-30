import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import { makeStyles } from "@mui/styles";


function BottomNav(){
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const useStyles = makeStyles({
    bottomNav:{
      backgroundColor: "#FFB7C5"
    }
  });
  const classes = useStyles();

    return (
      <Paper 
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
      className={classes.bottomNav}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}>
            <BottomNavigationAction component={Link} to="/home" icon={<HomeIcon color="disabled" />} />
            <BottomNavigationAction component={Link} to="/favorites" label="Favorites" icon={<FavoriteIcon color="disabled"  />} />
            <BottomNavigationAction component={Link} to="/form" label="Recipe" icon={<AddCircleIcon color="disabled" />} />
            <BottomNavigationAction component={Link} to="/about" label="About" icon={<InfoIcon color="disabled"/>} />
            <BottomNavigationAction component={Link} to="/profile"  icon={<PersonIcon color="disabled"/>} />
          </BottomNavigation>
        </Paper>
    );
  }
  export default BottomNav;
