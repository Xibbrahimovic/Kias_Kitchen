import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RecipeItem from "../RecipeItem/RecipeItem";
import BottomNav from "../BottomNav/BottomNav";
import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

function Favorites() {
  const dispatch = useDispatch();
  //allows favorites to be accessed on this view
  const favorites = useSelector((store) => store.favorites);

  const useStyles = makeStyles({
    formHeaderPaper:{
      backgroundColor: "#FFB7C5",
      marginBottom: 5,
  },
    tableCell:{
      padding: "0px 8px"
    }
});
  const classes = useStyles();

  console.log("This is the favorites reducer", favorites);

  //calls for GET request to favorites route on page load
  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" });
  }, []);

  return (
    <>
      <Container className="container">
        <Paper 
        className={classes.formHeaderPaper}>
        <Typography 
        sx={{
          ml: 2
        }}
        variant="h5">FAVORITES</Typography>
        </Paper>
        {/* conditional renders to see if any recipes exist on this list */}
        {favorites.length === 0 ? (
          <Typography>You don't have any favorites yet! 🥲</Typography>
        ) : (
          favorites.map((recipe) => {
            return (
              <RecipeItem
                key={recipe.id}
                recipe={recipe}
                favid={recipe.favid}
              />
            );
          })
        )}
      </Container>
      <BottomNav />
    </>
  );
}

export default Favorites;
