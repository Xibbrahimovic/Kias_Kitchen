import React from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import RecipeItem from '../RecipeItem/RecipeItem';
import BottomNav from '../BottomNav/BottomNav';
import { Container, Typography } from '@mui/material';

function Favorites() {
  return (
    <Container>
      <Container className="container">
        <Typography>Your favorites!</Typography>

      </Container>
      <BottomNav/>
    </Container>
  );
}

export default Favorites;
