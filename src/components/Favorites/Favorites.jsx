import React from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import RecipeItem from '../RecipeItem/RecipeItem';
import BottomNav from '../BottomNav/BottomNav';
import { Container, Typography } from '@mui/material';




function Favorites() {
  const dispatch = useDispatch();
  //allows favorites to be accessed on this view
  const favorites = useSelector((store) => store.favorites);
  const recipes = useSelector((store) => store.home);

  console.log('This is the favorites reducer', favorites);

  //calls for GET request to favorites route on page load
  useEffect(() => {
    dispatch({type: 'FETCH_FAVORITES'})
  }, []);


  return (
    <Container>
      <Container className="container">
        <Typography>Your favorites!</Typography>
        {favorites.map(recipe => {
          return (
            <RecipeItem
            key={recipe.id}
            recipe={recipe}
            />
          )
        })}
      </Container>
      <BottomNav/>
    </Container>
  );
}

export default Favorites;
