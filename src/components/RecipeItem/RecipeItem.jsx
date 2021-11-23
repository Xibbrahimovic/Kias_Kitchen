import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from 'react';

//EXTRA MUI AT THE END 
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from '@mui/material/Rating';

function RecipeItem({recipe}){
    const dispatch = useDispatch();
    const history = useHistory();
    const toDetails = () => {
        //dispatching recipe as object to details reducer
        dispatch({type: "STORE_DETAILS", payload: recipe}),
        //navigate to details page
        history.push("/details")
    }


    console.log("This is the recipe sent to reducer",recipe);
    
    return(
        <Card
            className="recipeCard"
            style={{
                backgroundColor: ""
            }}
            sx={{ maxWidth: 370,
                    mb: 1,}}
            key={recipe.id}>
            <CardActionArea>
                <CardMedia
                    onClick={toDetails}
                    component="img"
                    height="300"
                    src={recipe.image}
                    alt={recipe.name}
                />
                <CardContent>
                    <Typography
                        className="caption"
                        variant="caption">{recipe.name}</Typography>
                        
                    <Typography
                    sx={{
                        mx: 5
                    }}
                        className="caption"
                        variant="caption">Cook Time: {recipe.time} min</Typography>

                <Rating 
                    name="half-rating" 
                    precision={0.5}
                    value={recipe.recipe_rating} 
                    readOnly />
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default RecipeItem;