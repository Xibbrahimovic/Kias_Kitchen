import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from "@mui/material";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";

function Details() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // const user = useSelector((store) => store.user);

  //allows recipes store to be accessed in page -- need for fetching and displaying
  const dispatch = useDispatch();
  const reviewsCount = useSelector((store) => store.reviewsCount);
  const history = useHistory();
  const recipe = useSelector((store) => store.details);

  const [value, setValue] = useState(recipe.recipe_rating);

  const useStyles = makeStyles({
    recipePaper:{
      backgroundColor: "#B7E9FF"
    },
    backBtn:{
      backgroundColor: "#FFB7C5"
    },
    
});

  const classes = useStyles();

  useEffect(() => {
      dispatch({type: 'FETCH_REVIEW_COUNT', payload: recipe.id });
  }, []);

  console.log(recipe.id);

  return (
    // INSERT Header for Home page here
    <div>
      <Button
      sx={{
        my: 1,
        ml: 1,
      }}
      className={classes.backBtn}
      size="small"
      variant="contained"
      onClick={() => {history.push('/home')}}
      startIcon={<ArrowBackIosNewIcon/>}>BACK</Button>
      <div>
      <Paper className={classes.recipePaper} sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          height="300px"
          width="375px"
          />
        <div>
            <Typography variant="h4">{recipe.name}</Typography>
            <Typography 
            sx={{ fontWeight: 'light' }}variant="h6">{recipe.time} minutes</Typography>

            <Rating
              name="simple-controlled"
              precision={0.25}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                history.push(`/review/${recipe.id}`);
              }}
            />
            {reviewsCount >= 1 ? <Typography
            sx={{ fontStyle: 'italic', fontWeight: 'light'}}
            onClick={() => history.push(`/reviews/${recipe.id}`)}
            >( {reviewsCount} ) Review(s)</Typography>
            : <Typography
            sx={{ fontStyle: 'italic', fontWeight: 'light'}}
            onClick={() => history.push(`/reviews/${recipe.id}`)}
            >Be the first to review!</Typography>}
            

            <Typography variant="h4">Overview</Typography>
            
            <Typography 
            sx={{ fontWeight: 'light' }}variant="h6">{recipe.overview}</Typography>
            
            <Typography variant="h4">Ingredients</Typography>
            
            <Typography 
            sx={{ fontWeight: 'light' }}variant="h6">{recipe.ingredients}</Typography>
            
            <Typography variant="h4">Instructions</Typography>
            
            <Typography 
            sx={{ fontWeight: 'light' }}variant="h6">{recipe.instructions}</Typography>
        </div>
        </Paper>
      </div>
    </div>
  );
}

export default Details;
