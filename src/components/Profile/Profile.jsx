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

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
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
      <Typography variant="h5">Hello, {user.username}!</Typography>
      <Typography variant="h5">Your Recipes List</Typography>
      <br></br>
      {userRecipes.length === 0 ? 
          (<Typography>You don't have any recipes yet. Upload your own on the bottom nav bar! 🙏</Typography>
          ):(
      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 300 }} aria-label="caption table">
        <caption>*All of your recipes you've uploaded are listed here</caption>
        <TableHead>
          <TableRow>
            <TableCell>Recipe Name</TableCell>
            <TableCell align="left">Rating</TableCell>
            <TableCell align="left">Cook Time(min)</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userRecipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell component="th" scope="row">
                {recipe.name}
              </TableCell>
              <TableCell align="left"><Rating
                  name="half-rating"
                  precision={0.25}
                  value={recipe.recipe_rating}
                  readOnly
                /></TableCell>
              <TableCell align="right">{recipe.time}</TableCell>
              <IconButton onClick={() => history.push(`/edit/${recipe.id}`)}>
                <EditIcon/></IconButton>
              <IconButton onClick={() => dispatch({type: 'DELETE_RECIPE', payload: recipe.id})}><DeleteForeverIcon/></IconButton>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    <br></br>
      <LogOutButton className="btn logoutBtn" />
      <BottomNav/>
    </div>
  );
}

export default Profile;
