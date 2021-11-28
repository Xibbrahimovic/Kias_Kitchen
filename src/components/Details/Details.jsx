import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from "@mui/material";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function Details() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // const user = useSelector((store) => store.user);

  //allows recipes store to be accessed in page -- need for fetching and displaying
  const dispatch = useDispatch();
  const reviewsCount = useSelector((store) => store.reviewsCount);
  const history = useHistory();
  const recipe = useSelector((store) => store.details);

  const [value, setValue] = useState(recipe.recipe_rating);


  useEffect(() => {
      dispatch({type: 'FETCH_REVIEW_COUNT', payload: recipe.id });
  }, []);

  console.log(recipe.id);

  return (
    // INSERT Header for Home page here
    <div>
      <Button
      size="small"
      variant="contained"
      onClick={() => {history.push('/home')}}
      startIcon={<ArrowBackIosNewIcon/>}>BACK</Button>
      <div className="">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          height="325px"
          width="375px"
          />
        <div>
            <h2>{recipe.name}</h2>
            <p>{recipe.time} minutes</p>

            <Rating
              name="simple-controlled"
              precision={0.25}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                history.push(`/review/${recipe.id}`);
              }}
            />
            <Typography
            onClick={() => history.push(`/reviews/${recipe.id}`)}
            >( {reviewsCount} ) Reviews</Typography>
            

            <h2>Overview</h2>
            <p>{recipe.overview}</p>
            <h2>Ingredients</h2>
            <p>{recipe.ingredients}</p>
            <h2>Instructions</h2>
            <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
