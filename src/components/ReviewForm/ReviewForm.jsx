import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';




function ReviewForm(){
    //carry over previous recipe_id to help identify recipe in route
    const {recipe_id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    let base = {
        rating: '',
        review: ''
    }

    //setting input fields to empty
    let [newReview, setNewReview] = useState(base);

    //applies input values to the property based on string passed
    const handleInputChange = (event, property) => {
        console.log('event happened');
        setNewReview({...newReview, [property]: event.target.value});
    }

    const addNewReview = event => {
        event.preventDefault();
        //dispatches newReview along with recipeID
        dispatch({type: 'ADD_REVIEW', payload: {newReview, recipe_id}});
        history.push('/home');
    }
    //checking the payload contents
    console.log('This is the review being sent to the saga', newReview);
    console.log(recipe_id); 
    console.log(newReview.review);

    // console.log('This is the store', recipe);
    return(
        <form
        onSubmit={addNewReview}>
            <Box
                sx={{
                    width: 500,
                    maxWidth: '90%',
                }}>

                <Typography>
                    Leave a review! 😃
                </Typography>

                <TextField 
                    multiline={true}
                    rows={10}
                    fullWidth 
                    label="What did you think of the recipe?" 
                    id="fullWidth" 
                    value={newReview.review}
                    onChange={(event) => handleInputChange(event, 'review')}/>

                <Rating
                    name="simple-controlled"
                    value={newReview.value}
                    onChange={(event) => handleInputChange(event, 'rating')}/>
            </Box>

            <Button
                type="submit"
                variant="contained"
                color="success"
            >Submit Review</Button>
        </form>
    )
}

export default ReviewForm;