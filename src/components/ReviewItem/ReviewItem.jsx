import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from 'react';

//EXTRA MUI AT THE END 

import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import { Container } from "@mui/material";

function ReviewItem({review}){


    return(
        <Container>
        <Container
        className="reviewItem"
        key={review.id}
        >Here's what the community kitchens thought about {review.username}
        </Container>
        </Container>

    )
}

export default ReviewItem;