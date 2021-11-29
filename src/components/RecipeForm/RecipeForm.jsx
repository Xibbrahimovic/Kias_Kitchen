import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import BottomNav from "../BottomNav/BottomNav";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PublishIcon from "@mui/icons-material/Publish";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

function RecipeForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const useStyles = makeStyles({
    backBtn: {
      backgroundColor: "#FFB7C5",
    },
    formHeaderPaper: {
      backgroundColor: "#FFB7C5",
      marginTop: 10,
      marginBottom: 20,
    },
    root: {
      "& .MuiOutlinedInput-root": {
        background: "rgb(255, 255, 255)",
        borderColor: "#5fa9c9",
      },
    },
  });
  const classes = useStyles();

  let base = {
    image:
      "https://soupeduprecipes.com/wp-content/uploads/2019/08/chinese-egg-rolls-500x375.png",
    name: "Egg Rolls",
    time: "90",
    overview: "The staple appetizer to all of Asia",
    ingredients:
      "3 lbs protein of choice, or none at all mung bean thread noodles 5 cups of shredded cabbage and carrots 1 tbsp of minced garlic 1 cup of fresh or soaked finely chopped black fungus ( optional) 1 dozen eggs 1/3 cup of oyster mushroom 3 tbsp of black pepper 1 1/2 cup of potatoe flakes Oil for frying",
    instructions:
      "Soak and drain the mung bean noodles.  cut the noodles. set it into a large bowl. Add in all the ingredients.  using only 7-9 eggs only.  save the rest for wrapping. Step 2:	Set up wrapping station, unwrap, peel each of the wrappers onto a large plate.	Step 3:	take one sheet of the wrapper, set it on a different area, fill it up with the one spoon of fillings, lenghtwise, from one corner to the other corner.  fold the bottom corner up then fold the two side corners in.  finish the wrapping by brush eggs on the last corner to hold the roll.  repeat until all fillings and wraps are done.	Step 4:	heat up oil to 425 degrees, slowly dip the egg rolls into the wok/pan of heated oil. cook until slightly golden. about 15 minutes on meduim to high heat.	Serve with choice of sauce"
  };

  //Initial state is an object, with all the different input values set to empty
  let [newRecipe, setRecipe] = useState(base);

  const handleInputChange = (event, property) => {
    console.log("event happened");
    //spreading initial object and assigning values to associated key
    setRecipe({ ...newRecipe, [property]: event.target.value });
  };

  const addNewRecipe = (event) => {
    event.preventDefault();
    //sends over new object to saga/server to process and send to DB
    dispatch({ type: "ADD_RECIPE", payload: newRecipe });
    history.push('/home');
  };
  console.log(newRecipe);

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper className={classes.formHeaderPaper}>
          <Typography variant="h5">Add your recipe to the kitchen!</Typography>
        </Paper>
      </Grid>
      <form className="recipeForm" onSubmit={addNewRecipe}>
        <Box
          sx={{
            width: 500,
            maxWidth: "90%",
            mb: 15,
          }}
        >
          <div>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Upload your photo here!"
              helperText="-Make sure it's a url! :D"
              fullWidth
              type="url"
              value={newRecipe.image}
              onChange={(event) => handleInputChange(event, "image")}
            />
          </div>
          <br></br>
          <div>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Recipe Name "
              fullWidth
              type="text"
              value={newRecipe.name}
              onChange={(event) => handleInputChange(event, "name")}
            />
          </div>
          <br></br>
          <div>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Cook Time "
              helperText="- How long will it take? (min)"
              fullWidth
              type="text"
              value={newRecipe.time}
              onChange={(event) => handleInputChange(event, "time")}
            />
          </div>
          <br></br>
          <div>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Overview"
              helperText="- Sell your recipe, what is it about? ✨"
              fullWidth
              multiline={true}
              rows={5}
              type="text"
              value={newRecipe.overview}
              onChange={(event) => handleInputChange(event, "overview")}
            />
          </div>
          <br></br>
          <div>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Ingredients "
              helperText="- What should i get from my kitchen?"
              fullWidth
              multiline={true}
              rows={10}
              type="text"
              value={newRecipe.ingredients}
              onChange={(event) => handleInputChange(event, "ingredients")}
            />
          </div>
          <br></br>
          <div>
            <TextField
              className={classes.root}
              variant="outlined"
              label="Instructions"
              helperText="- Remember to number your steps!"
              fullWidth
              multiline={true}
              rows={10}
              type="text"
              value={newRecipe.instructions}
              onChange={(event) => handleInputChange(event, "instructions")}
            />
          </div>
          <br></br>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              className="btn"
              color="success"
              type="submit"
              value="Add New Recipe"
              endIcon={<PublishIcon />}
            >
              Submit Recipe!
            </Button>
            <Button
              className={classes.backBtn}
              sx={{
                mt: 2,
              }}
              variant="contained"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => {
                history.push("/home");
              }}
            >
              GO BACK
            </Button>
          </Grid>
        </Box>
      </form>
      <BottomNav />
    </div>
  );
}

export default RecipeForm;
