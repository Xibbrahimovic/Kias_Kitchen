import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";

import { Container } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

function Reviews(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {recipe_id} = useParams();

    const reviews = useSelector((store) => store.reviews);


    useEffect(() => {
        dispatch({type: 'FETCH_ALL_REVIEWS', payload: recipe_id})
    }, []);


    console.log('This is the payload being sent over:', recipe_id);
    console.log('this is the reviews reducer:', reviews);
    

    return(
        <Container>
        <Container>
        {reviews.map(review => {
            return(
                <Review
                key={review.id}
                review={review}
                />)
        })}
        </Container>
        <BottomNav/>
        </Container>
    )
}

export default Reviews;