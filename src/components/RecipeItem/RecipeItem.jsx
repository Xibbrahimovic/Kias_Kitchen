import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";

//EXTRA MUI AT THE END
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";

import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import { pink } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

function RecipeItem({ recipe, favid }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles({
    recipeCard:{
      backgroundColor: "#B7E9FF"
    }
});
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const toDetails = () => {
    //dispatching recipe as object to details reducer
    dispatch({ type: "STORE_DETAILS", payload: recipe }),
      //navigate to details page
      history.push("/details");
  };

  const addFavorite = () => {
    console.log("Filling up my favorites <3");
    dispatch({ type: "ADD_FAVORITE", payload: recipe });
    setOpen(true);
  };

  const deleteFavorite = () => {
    console.log("Removing from favorites :(");
    dispatch({ type: "DELETE_FAVORITE", payload: recipe });
  };

  return (
    <Card
      className={classes.recipeCard}
      sx={{ 
        maxWidth: 375, 
        mb: 2,}}
      key={recipe.id}
    >
      <Card
      className={classes.recipeCard}>
      
        <CardMedia
          onClick={toDetails}
          component="img"
          height="300"
          src={recipe.image}
          alt={recipe.name}
        />

        <CardContent>
        <Grid 
        container 
        spacing={{ xs: 1, md: 3 }} 
        columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid 
            item xs 
            container 
            direction="column" 
            spacing={1}
            justify="flex-end">
          <Grid 
            item xs
            rowSpacing={2}>
              <Typography 
                className="caption" 
                variant="caption h6"
                sx={{ fontWeight: 'bold' }}>
                {recipe.name}
              </Typography>
            </Grid>

          <Grid item xs>
          <Typography
                className="caption"
                variant="caption h6"
                sx={{ fontWeight: 'medium' }}
              >
              Total Cook Time:
              </Typography>
              </Grid>
              <Grid item xs>
              <Typography
                className="caption"
                variant="caption h6"
                sx={{ fontWeight: 'light' }}
              >
              {recipe.time} min
              </Typography>
          </Grid>
          </Grid>


          <Grid 
            item xs 
            container 
            direction="column" 
            spacing={1}
            alignContent="flex-end">
            <Grid item xs >
            <Rating
              name="half-rating"
              precision={0.25}
              value={recipe.recipe_rating}
              readOnly
            />
            </Grid>
              <Grid item xs
              justifyContent="flex-end">
              {favid 
              ? <IconButton onClick={deleteFavorite}>
                  <FavoriteIcon
                  sx={{ color: pink[400] }}/>
              </IconButton>
              :<IconButton onClick={addFavorite}>
                  <FavoriteBorderOutlinedIcon/>
              </IconButton>}
            </Grid>
          </Grid>
        </Grid>
        </CardContent>
      </Card>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Recipe added to favorites! ❤️  
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default RecipeItem;
