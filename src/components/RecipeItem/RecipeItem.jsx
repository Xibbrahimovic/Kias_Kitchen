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
import { pink } from "@mui/material/colors";

function RecipeItem({ recipe, favid }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

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
      className="recipeCard"
      style={{
        backgroundColor: "",
      }}
      sx={{ maxWidth: 370, mb: 1 }}
      key={recipe.id}
    >
      <Card>
        <CardMedia
          onClick={toDetails}
          component="img"
          height="300"
          src={recipe.image}
          alt={recipe.name}
        />
        <CardContent>
          <Typography className="caption" variant="caption">
            {recipe.name}
          </Typography>

          <Typography
            sx={{
              mx: 5,
            }}
            className="caption"
            variant="caption"
          >
            Cook Time: {recipe.time} min
          </Typography>

          <Rating
            name="half-rating"
            precision={0.25}
            value={recipe.recipe_rating}
            readOnly
          />
        {favid 
        ? <IconButton onClick={deleteFavorite}>
            <FavoriteIcon
            sx={{ color: pink[400] }}/>
        </IconButton>
        :<IconButton onClick={addFavorite}>
            <FavoriteBorderOutlinedIcon/>
        </IconButton>}
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
