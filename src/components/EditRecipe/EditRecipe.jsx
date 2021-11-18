import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";

function EditRecipe(){
    const dispatch = useDispatch();
    const {recipe_id} = useParams();
    const history = useHistory();

    let base = {
        image:'',
        name: '',
        time: '',
        overview: '',
        ingredients: '',
        instructions: ''
    };

    //Initial state is an object, with all the different input values set to empty
    let [myRecipe, editMyRecipe] = useState(base);

    const handleInputChange = (event, property) => {
        console.log('event happened');
        //spreading initial object and assigning values to associated key 
        editMyRecipe({...myRecipe, [property]: event.target.value})
    }

    const updateRecipe = event => {
        event.preventDefault();
        //sends over new object to saga/server to process and send to DB
        dispatch({type: 'EDIT_RECIPE', 
        payload: {...myRecipe, recipe_id}})
        history.push('/profile');
    }
    console.log(myRecipe);

    return(
        <div>
            <h2>Add your recipe to the kitchen!</h2>
            <form 
            className="recipeForm"
            onSubmit={updateRecipe}>
                <div>
                <input
                    placeholder="Upload your photo here! "
                    type="url"
                    value={myRecipe.image}
                    onChange={(event) => handleInputChange(event, 'image')}/>
                </div>
                <div>
                <input
                    placeholder="Recipe Name "
                    type="text"
                    value={myRecipe.name}
                    onChange={(event) => handleInputChange(event, 'name')}/>
                </div>
                <div>
                <input
                    placeholder="Cook Time - How long will it take? (min)"
                    type="text"
                    value={myRecipe.time}
                    onChange={(event) => handleInputChange(event, 'time')}/>
                </div>

                <div>
                <input
                    placeholder="Overview - Sell your recipe, what is it about? ✨"
                    type="text"
                    value={myRecipe.overview}
                    onChange={(event) => handleInputChange(event, 'overview')}/>
                </div>

                <div>
                <input
                    placeholder="Ingredients - What should i get from my kitchen? "
                    type="text"
                    value={myRecipe.ingredients}
                    onChange={(event) => handleInputChange(event, 'ingredients')}/>
                </div>

                <div>
                <input
                    placeholder="Instructions - Now, what do I need to do? 1️⃣"
                    type="text"
                    value={myRecipe.instructions}
                    onChange={(event) => handleInputChange(event, 'instructions')}/>
                </div>
                <button 
                className= "btn"
                type='submit' 
                value='Edit Recipe'>Submit Changes!</button>
            </form>
        </div>
    )
}

export default EditRecipe;