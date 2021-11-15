import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';

import RecipeItem from '../RecipeItem/RecipeItem';


function Home() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // const user = useSelector((store) => store.user);

  //initiates dispatch for use
  const dispatch = useDispatch();

  //allows recipes store to be accessed in page -- need for fetching and displaying 
  const recipes = useSelector((store) => store.recipes);

  return (
        // INSERT Header for Home page here
    <div>
    <div className="container">
      {/* Loops through recipes store and fetches all the recipes */}
      {recipes.map(recipe => {
        return (
          <RecipeItem
          key={recipe.id}
          recipe={recipe}
          />
        )
      })}
      
    </div>
    </div>
  );
}
{/* <LogOutButton className="btn" /> */}
// this allows us to use <App /> in index.js
export default Home;
