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

import { Icon } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

function RecipeItem({ recipe, favid }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const toDetails = () => {
    //dispatching recipe as object to details reducer
    dispatch({ type: "STORE_DETAILS", payload: recipe }),
      //navigate to details page
      history.push("/details");
  };

//   const [favorite, setFavorite] = useState(false)
//   if (favid) {
//     isFavorited = `<IconButton onClick={() => {deleteFavorite}}><FavoriteIcon/></IconButton>`;
//   } else {
//     isFavorited = `<IconButton onClick={() => {addFavorite}}>
//     <FavoriteBorderOutlinedIcon/>
//     </IconButton>`;
//   }

  const addFavorite = () => {
    console.log("Filling up my favorites <3");
    dispatch({ type: "ADD_FAVORITE", payload: recipe });
  };

  const deleteFavorite = () => {
    console.log("Removing from favorites :(");
    dispatch({ type: "DELETE_FAVORITE", payload: recipe });
  };

  console.log("This is the recipe sent to reducer", recipe);
//   console.log(isFavorited);
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
                {favid ? 
                <IconButton onClick={deleteFavorite}>
                    <FavoriteIcon/>
                </IconButton>
                :<IconButton onClick={addFavorite}>
                    <FavoriteBorderOutlinedIcon/>
                </IconButton>}
        </CardContent>
      </Card>
    </Card>
  );
}

export default RecipeItem;
