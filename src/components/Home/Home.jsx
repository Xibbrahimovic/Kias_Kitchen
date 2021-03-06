import React from 'react';

import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import RecipeItem from '../RecipeItem/RecipeItem';
import BottomNav from '../BottomNav/BottomNav';
import './Home.css';

import Typography from '@mui/material/Typography';


function Home() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // const user = useSelector((store) => store.user);

  //initiates dispatch for use
  const dispatch = useDispatch();

  //allows recipes store to be accessed in page -- need for fetching and displaying 
  const home = useSelector((store) => store.home);
  
  //will dispatch to populate recipes for reducer 
  useEffect(() => {
    dispatch({type: 'FETCH_RECIPES'})
}, []);

  console.log('This is home reducer', home);
  return (
        // INSERT Header for Home page here
    <div>
      <div className="container">
        {/* Loops through recipes store and fetches all the recipes */}
        {home.map(recipe => {
          return (
            <RecipeItem
            key={recipe.id}
            recipe={recipe}
            favid={recipe.favid}
            />
          )
        })}
        
      </div>
    <BottomNav/>
    </div>
  );
}

export default Home;
