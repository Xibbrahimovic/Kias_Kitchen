import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory, useParams, withRouter } from "react-router";

import { Container, Typography } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PublishIcon from "@mui/icons-material/Publish";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";


import ReviewItem from '../ReviewItem/ReviewItem';

function Reviews(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {recipe_id} = useParams();

    const reviews = useSelector((store) => store.reviews);

    const useStyles = makeStyles({
        backBtn:{
            backgroundColor: "#FFB7C5"
        },
        formHeaderPaper:{
            backgroundColor: "#FFB7C5",
            marginTop: 10,
            marginBottom: 20,
        },
        root: {
            "& .MuiOutlinedInput-root": {
              background: "rgb(255, 255, 255)",
              borderColor: "#5fa9c9"
            }
          }
    });
      const classes = useStyles();
    


    useEffect(() => {
        dispatch({type: 'FETCH_ALL_REVIEWS', payload: recipe_id})
    }, []);


    console.log('This is the payload being sent over:', recipe_id);
    console.log('this is the reviews reducer:', reviews);
    

    return(
        <Container>
            <Button
                sx={{
                    my: 2,
                }}
                className={classes.backBtn}
                variant="contained"
                size="small"
                onClick={() => history.push('/home')}
                startIcon={<ArrowBackIosNewIcon/>}>BACK</Button>
                <Paper>
            <Typography variant="h5">Here's what the community kitchens thought about this dish!</Typography>
            </Paper>
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
            <Typography variant="h5">Post your own review!</Typography>
            <Button
                onClick={() => history.push(`/review/${recipe_id}`)}
                variant="contained"
                className="btn"
                color="success"
                value="Add New Recipe"
                endIcon={<PublishIcon />}
            >Add Review</Button>
            <BottomNav/>
        </Container>
    )
}

export default Reviews;