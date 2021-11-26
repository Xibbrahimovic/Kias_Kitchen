import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function EditRecipe(){
    const dispatch = useDispatch();
    const {recipe_id} = useParams();
    const history = useHistory();
    const recipeList = useSelector((store) => store.home);

    let [editRecipe, setEditRecipe] = useState({});

    useEffect(() => {
        for(let recipe of recipeList){
            if(recipe.id === recipe_id){
                setEditRecipe(recipe);
            }
        }
      }, [])

    // let base = {
    //     image:recipe.image,
    //     name: recipe.name,
    //     time: recipe.time,
    //     overview: recipe.overview,
    //     ingredients: recipe.ingredients,
    //     instructions: recipe.instructions
    // };

    //Initial state is an object, with all the different input values set to empty
    // let [myRecipe, editMyRecipe] = useState(base);

    const handleInputChange = (event, property) => {
        console.log('event happened');
        //spreading initial object and assigning values to associated key 
        setEditRecipe({...editRecipe, [property]: event.target.value})
    }

    const updateRecipe = event => {
        event.preventDefault();
        //sends over new object to saga/server to process and send to DB
        dispatch({type: 'EDIT_RECIPE', payload: {...editRecipe, recipe_id}})
        history.push('/profile');
    }
    console.log(editRecipe);

    return(
        <div>
            <Typography
            variant="h6">Make sure to save your changes!</Typography>
            <Button
            variant="contained"
            startIcon={<ArrowBackIosNewIcon/>}
            onClick={() => {history.push('/profile')}}>GO BACK</Button>
            <br></br>
            <br></br>
            <form 
            className="recipeForm"
            onSubmit={updateRecipe}>
                <Box
                sx={{
                    width: 500,
                    maxWidth: '90%',
                    mb: 15
                }}>
                <div>
                <TextField
                    label="Upload your photo here!"
                    fullWidth 
                    variant="outlined"
                    placeholder="Upload your photo here! "
                    type="url"
                    value={editRecipe.image}
                    onChange={(event) => handleInputChange(event, 'image')}/>
                </div>
                <br></br>
                <div>
                <TextField
                    label="Recipe Name"
                    fullWidth 
                    variant="outlined"
                    placeholder="Recipe Name "
                    type="text"
                    value={editRecipe.name}
                    onChange={(event) => handleInputChange(event, 'name')}/>
                </div>
                <br></br>
                <div>
                <TextField
                    label="Cook Time - How long will it take? (min)"
                    fullWidth 
                    variant="outlined"
                    placeholder="Cook Time - How long will it take? (min)"
                    type="text"
                    value={editRecipe.time}
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
                    placeholder="Overview - Sell your recipe, what is it about? ✨"
                    type="text"
                    value={editRecipe.overview}
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
                    placeholder="Ingredients - What should i get from my kitchen? "
                    type="text"
                    value={editRecipe.ingredients}
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
                    placeholder="Instructions - Now, what do I need to do? 1️⃣"
                    type="text"
                    value={editRecipe.instructions}
                    onChange={(event) => handleInputChange(event, 'instructions')}/>
                </div>
                <br></br>
                <Button 
                variant="contained"
                className= "btn"
                type='submit' 
                value='Edit Recipe'
                endIcon={<SaveIcon/>}>Submit Changes!</Button>
                </Box>
            </form>
        </div>
    )
}

export default EditRecipe;