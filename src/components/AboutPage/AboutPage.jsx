import React from 'react';
import BottomNav from '../BottomNav/BottomNav';
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import { Typography } from '@mui/material';
import Logo from '../images/logo.png';
import Grid from "@mui/material/Grid";


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
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid item xs>
          <Typography 
          sx={{
            ml: 2,

          }}variant="h3" >about</Typography>
          <img className="logo" src={Logo} alt="flowerphoto"/>
        </Grid>
      </Grid>
        <Grid>
          <Typography 
          sx={{
            mx: 2
          }}variant="h6">
              Our application was 
              inspired by Kia’s work in
              the kitchen throughout 
              her life. Whatever dish 
              that she cooks up has 
              always been in the company 
              of the people she loved. Often times, she 
              has kept recipes to which were not always 
              originals, but shared with her to create new 
              memories together. </Typography>
          <Typography 
          sx={{mx: 2, my: 2}}variant="h5" > Technologies Used:</Typography>
          <Typography sx={{mx: 2, my: 1.75}}variant="h6" fontWeight="light">
              React, Redux-Saga, Node.js, Express, Passport, PostgresQL, Material UI</Typography>
      </Grid>
      <BottomNav/>
    </Paper>
  );
}

export default AboutPage;
