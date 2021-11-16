import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  //Access the store where the recipes are
  const userRecipes = useSelector((store) => store.userRecipes);

  //populate the userRecipes store based on user ID
  useEffect(() => {
    dispatch({type: 'FETCH_USER_RECIPES'});
  }, [])

  console.log('Returned state of userRecipes reducer', userRecipes);

  return (
    <div className="container">
      <h2>Hello, {user.username}!</h2>
      {/* UPLOAD A PROFILE PHOTO HERE */}
      <p>Your ID is: {user.id}</p>
      <br></br>
      <h5>Your Recipes List</h5>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Cook Time</th>
          </tr>
        </thead>
        <tbody>
          {userRecipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              {/* <td>{recipe.rating}</td> */}
              <td>{recipe.time}</td>
              <button onClick={() => dispatch({type: 'DELETE_RECIPE', payload: recipe.id})}>DELETE</button>
            </tr>
          ))}
        </tbody>
      </table>

      <LogOutButton className="btn logoutBtn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Profile;