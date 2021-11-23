import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory, useParams, withRouter } from "react-router";

import { Container, Typography } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


import ReviewItem from '../ReviewItem/ReviewItem';

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
             <Button
                size="small"
                onClick={() => history.push('/home')}
                startIcon={<ArrowBackIosNewIcon/>}>BACK</Button>
            <Container>
            <Typography>Here's what the community kitchens thought about this dish!</Typography>
            {reviews.map(review => {
                return(
                    <Paper
                        elevation={3}>
                        <ReviewItem
                            sx={{
                                my: '5'
                            }}
                            key={review.id}
                            review={review}
                        />
                    </Paper>
                    )
            })}
            </Container>
            <BottomNav/>
        </Container>
    )
}

export default Reviews;