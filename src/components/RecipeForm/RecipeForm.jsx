import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import BottomNav from "../BottomNav/BottomNav";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PublishIcon from '@mui/icons-material/Publish';

function RecipeForm(){
    const dispatch = useDispatch();

    let base = {
        image:'',
        name: '',
        time: '',
        overview: '',
        ingredients: '',
        instructions: ''
    };

    //Initial state is an object, with all the different input values set to empty
    let [newRecipe, setRecipe] = useState(base);

    const handleInputChange = (event, property) => {
        console.log('event happened');
        //spreading initial object and assigning values to associated key 
        setRecipe({...newRecipe, [property]: event.target.value})
    }

    const addNewRecipe = event => {
        event.preventDefault();
        //sends over new object to saga/server to process and send to DB
        dispatch({type: 'ADD_RECIPE', payload: newRecipe})
        setRecipe(base);
    }
    console.log(newRecipe);

    return(
        <div>
            <Typography variant="h6">Add your recipe to the kitchen!</Typography>
            <form 
            className="recipeForm"
            onSubmit={addNewRecipe}>
                <Box
                sx={{
                    width: 500,
                    maxWidth: '90%',
                    mb: 15
                }}>
                <div>
                <TextField
                    variant="outlined"
                    label="Upload your photo here!"
                    fullWidth
                    type="url"
                    value={newRecipe.image}
                    onChange={(event) => handleInputChange(event, 'image')}/>
                </div>
                <br></br>
                <div>
                <TextField
                    variant="outlined"
                    label="Recipe Name "
                    fullWidth
                    type="text"
                    value={newRecipe.name}
                    onChange={(event) => handleInputChange(event, 'name')}/>
                </div>
                <br></br>
                <div>
                <TextField
                    variant="outlined"
                    label="Cook Time - How long will it take? (min)"
                    fullWidth
                    type="text"
                    value={newRecipe.time}
                    onChange={(event) => handleInputChange(event, 'time')}/>
                </div>
                <br></br>
                <div>
                <TextField
                    variant="outlined"
                    label="Overview - Sell your recipe, what is it about? ✨"
                    fullWidth
                    multiline={true}
                    rows={5}
                    type="text"
                    value={newRecipe.overview}
                    onChange={(event) => handleInputChange(event, 'overview')}/>
                </div>
                <br></br>
                <div>
                <TextField
                    variant="outlined"
                    label="Ingredients - What should i get from my kitchen? "
                    fullWidth
                    multiline={true}
                    rows={10}
                    type="text"
                    value={newRecipe.ingredients}
                    onChange={(event) => handleInputChange(event, 'ingredients')}/>
                </div>
                <br></br>
                <div>
                <TextField
                    variant="outlined"
                    label="Instructions - Now, what do I need to do? 1️⃣"
                    fullWidth 
                    multiline={true}
                    rows={10}
                    type="text"
                    value={newRecipe.instructions}
                    onChange={(event) => handleInputChange(event, 'instructions')}/>
                </div>
                <br></br>
                <Button 
                variant="contained"
                className= "btn"
                color="success"
                type='submit' 
                value='Add New Recipe'
                endIcon={<PublishIcon/>}
                >Submit Recipe!</Button>
                </Box>
            </form>
            <BottomNav/>
        </div>
    )
}

export default RecipeForm;