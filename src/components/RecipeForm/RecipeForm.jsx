import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

function RecipeForm(){
    const dispatch = useDispatch();


    //Initial state is an object, with all the different input values set to empty
    let [newRecipe, setRecipe] = useState({
        image:'',
        name: '',
        time: '',
        overview: '',
        ingredients: '',
        instructions: ''
    })

    const handleInputChange = (event, property) => {
        console.log('event happened');
        //spreading initial object and assigning values to associated key 
        setRecipe({...newRecipe, [property]: event.target.value})
    }

    const addNewRecipe = event => {
        event.preventDefault();
        //sends over new object to saga/server to process and send to DB
        dispatch({type: 'ADD_RECIPE', payload: newRecipe})
    }

    console.log(newRecipe);

    return(
        <div>
            <h2>Add your recipe to the kitchen!</h2>
            <form 
            className="recipeForm"
            onSubmit={addNewRecipe}>
                <div>
                <input
                    placeholder="Upload your photo here! "
                    type="url"
                    value={newRecipe.image}
                    onChange={(event) => handleInputChange(event, 'image')}/>
                </div>
                <div>
                <input
                    placeholder="Recipe Name "
                    type="text"
                    value={newRecipe.name}
                    onChange={(event) => handleInputChange(event, 'name')}/>
                </div>
                <div>
                <input
                    placeholder="Cook Time - How long will it take? (min)"
                    type="text"
                    value={newRecipe.time}
                    onChange={(event) => handleInputChange(event, 'time')}/>
                </div>

                <div>
                <input
                    placeholder="Overview - Sell your recipe, what is it about? ✨"
                    type="text"
                    value={newRecipe.overview}
                    onChange={(event) => handleInputChange(event, 'overview')}/>
                </div>

                <div>
                <input
                    placeholder="Ingredients - What should i get from my kitchen? "
                    type="text"
                    value={newRecipe.ingredients}
                    onChange={(event) => handleInputChange(event, 'ingredients')}/>
                </div>

                <div>
                <input
                    placeholder="Instructions - Now, what do I need to do? 1️⃣"
                    type="text"
                    value={newRecipe.instructions}
                    onChange={(event) => handleInputChange(event, 'instructions')}/>
                </div>
                <button 
                className= "btn"
                type='submit' 
                value='Add New Plant'>Submit Recipe!</button>
            </form>
        </div>
    )
}

export default RecipeForm;