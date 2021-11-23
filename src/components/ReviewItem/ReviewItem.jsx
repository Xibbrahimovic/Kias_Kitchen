import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from 'react';

//EXTRA MUI AT THE END 

import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import { Container } from "@mui/material";
import { Box } from "@mui/system";

import Paper from '@mui/material/Paper';

function ReviewItem({review}){


    console.log(review);
    return(
        <Container>
            <Container
                className="reviewItem"
                key={review.id}
            >{review.username}
            </Container>
            <Box>
                {review.review}
            </Box>

            <Rating
                name="half-rating"
                value={review.rating}
                readOnly/>

        </Container>

    )
}

export default ReviewItem;