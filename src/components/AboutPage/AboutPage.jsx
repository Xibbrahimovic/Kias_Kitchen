import React from 'react';
import BottomNav from '../BottomNav/BottomNav';
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import { Typography } from '@mui/material';

function AboutPage() {

  const useStyles = makeStyles({
    about:{
      backgroundColor: "#B7E9FF",
    }
  });

  const classes = useStyles();
  
  return (
    <Paper 
    className={classes.about}>
      <div>
        <Typography 
        sx={{
          ml: 2,

        }}variant="h3" >about</Typography>
        <p>Our application was 
inspired by Kia’s work in
the kitchen throughout 
her life. Whatever dish 
that she cooks up has 
always been in the company 
of the people she loved. Often times, she 
has kept recipes to which were not always 
originals, but shared with her to create new 
memories together. </p>
    <img src="../public/images/pink-flowers-transparent-background-24.png" alt="flowerphoto"/>
      </div>
      <BottomNav/>
    </Paper>
  );
}

export default AboutPage;
