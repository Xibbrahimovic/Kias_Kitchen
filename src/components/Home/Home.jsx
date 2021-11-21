import React from 'react';

import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import RecipeItem from '../RecipeItem/RecipeItem';
import BottomNav from '../BottomNav/BottomNav';
import './Home.css';


function Home() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // const user = useSelector((store) => store.user);

  //initiates dispatch for use
  const dispatch = useDispatch();

  //allows recipes store to be accessed in page -- need for fetching and displaying 
  const home = useSelector((store) => store.home);

  useEffect(() => {
    dispatch({type: 'FETCH_RECIPES'})
}, []);
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
          />
        )
      })}
      
    </div>
    <BottomNav/>
    </div>
  );
}

export default Home;
