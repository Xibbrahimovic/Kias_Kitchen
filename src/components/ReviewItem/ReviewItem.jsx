import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from 'react';

//EXTRA MUI AT THE END 

import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Paper from '@mui/material/Paper';

function ReviewItem({review}){
    const useStyles = makeStyles({
        backBtn:{
            backgroundColor: "#FFB7C5"
        },
        paper:{
            backgroundColor: "#00acb0;",
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


    console.log(review);

    return(
        <Container
        sx={{
            mb: 2,
            mt: 2,
        }}>
            <Container
                className="reviewItem"
                key={review.id}
            ><Typography  variant="h6" fontWeight="light">Reviewed by {review.username}</Typography>
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