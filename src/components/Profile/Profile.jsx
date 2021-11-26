import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

import BottomNav from '../BottomNav/BottomNav';import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

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
      <table className="table">
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
              <td>{recipe.recipe_rating}</td>
              <td>{recipe.time}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      

      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 300 }} aria-label="caption table">
        <caption>*All of your recipes you've uploaded are listed here</caption>
        <TableHead>
          <TableRow>
            <TableCell>Recipe Name</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Cook Time(min)</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userRecipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell component="th" scope="row">
                {recipe.name}
              </TableCell>
              <TableCell align="left">{recipe.recipe_rating}</TableCell>
              {/* <TableCell align="right">{recipe.rating}</TableCell> */}
              <TableCell align="right">{recipe.time}</TableCell>
              <Button onClick={() => history.push(`/edit/${recipe.id}`)}>EDIT</Button>
              <Button onClick={() => dispatch({type: 'DELETE_RECIPE', payload: recipe.id})}>DELETE</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      <LogOutButton className="btn logoutBtn" />
      <BottomNav/>
    </div>
  );
}

export default Profile;
