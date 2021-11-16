import React, { useEffect } from "react";

import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";

function Details() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // const user = useSelector((store) => store.user);

  //allows recipes store to be accessed in page -- need for fetching and displaying
//   const dispatch = useDispatch();

  const recipe = useSelector((store) => store.details);

  console.log(recipe);
//   useEffect({
//       dispatch({type: })
//   })

  return (
    // INSERT Header for Home page here
    <div>
      <div className="container">
        <img src={recipe.image} alt={recipe.name} height="300px" />
        <div>
            <h2>{recipe.name}</h2>
            <p>{recipe.time} minutes</p>
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
