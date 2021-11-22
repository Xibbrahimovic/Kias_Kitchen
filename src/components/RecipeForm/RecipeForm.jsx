import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import BottomNav from "../BottomNav/BottomNav";
import { TextField } from "@mui/material";

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
            <h2>Add your recipe to the kitchen!</h2>
            <form 
            className="recipeForm"
            onSubmit={addNewRecipe}>
                <div>
                <TextField
                    placeholder="Upload your photo here! "
                    type="url"
                    value={newRecipe.image}
                    onChange={(event) => handleInputChange(event, 'image')}/>
                </div>
                <div>
                <TextField
                    placeholder="Recipe Name "
                    type="text"
                    value={newRecipe.name}
                    onChange={(event) => handleInputChange(event, 'name')}/>
                </div>
                <div>
                <TextField
                    placeholder="Cook Time - How long will it take? (min)"
                    type="text"
                    value={newRecipe.time}
                    onChange={(event) => handleInputChange(event, 'time')}/>
                </div>

                <div>
                <TextField
                    placeholder="Overview - Sell your recipe, what is it about? ✨"
                    type="text"
                    value={newRecipe.overview}
                    onChange={(event) => handleInputChange(event, 'overview')}/>
                </div>

                <div>
                <TextField
                    placeholder="Ingredients - What should i get from my kitchen? "
                    type="text"
                    value={newRecipe.ingredients}
                    onChange={(event) => handleInputChange(event, 'ingredients')}/>
                </div>

                <div>
                <TextField
                    placeholder="Instructions - Now, what do I need to do? 1️⃣"
                    type="text"
                    value={newRecipe.instructions}
                    onChange={(event) => handleInputChange(event, 'instructions')}/>
                </div>
                <button 
                className= "btn"
                type='submit' 
                value='Add New Recipe'>Submit Recipe!</button>
            </form>
            <BottomNav/>
        </div>
    )
}

export default RecipeForm;