import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import BottomNav from "../BottomNav/BottomNav";
import Rating from "@mui/material/Rating";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";


function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const useStyles = makeStyles({
    formHeaderPaper:{
      backgroundColor: "#FFB7C5",
      marginBottom: 10,
  },
    tableCell:{
      padding: "0px 8px"
    }
});
  const classes = useStyles();

  const user = useSelector((store) => store.user);
  //Access the store where the recipes are
  const userRecipes = useSelector((store) => store.userRecipes);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (recipe) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (recipe) => {
    handleClose();
    dispatch({ type: "DELETE_RECIPE", payload: recipe.id })
    console.log("this is handleDelete id", recipe.id);
  }

  //populate the userRecipes store based on user ID
  useEffect(() => {
    dispatch({ type: "FETCH_USER_RECIPES" });
  }, []);

  console.log("Returned state of userRecipes reducer", userRecipes);

  return (
    <div className="container">
      <Paper
      className={classes.formHeaderPaper}>
      <Typography 
      sx={{
        ml: 2
      }}
      variant="h5">Hello, {user.username}!</Typography>
      <Typography
      sx={{
        ml: 2
      }} 
      variant="h4">Your Recipes List</Typography>
      </Paper>
      <br></br>
      {userRecipes.length === 0 ? (
        <Typography>
          You don't have any recipes yet. Upload your own on the bottom nav bar!
          🙏
        </Typography>
      ) : (
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 350 }} aria-label="caption table">
              <caption>
                *All of your recipes you've uploaded are listed here
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell
                  >Recipe Name</TableCell>
                  <TableCell align="left">Rating</TableCell>
                  <TableCell 
                  className={classes.tableCell}
                  align="left">Cook Time(min)</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userRecipes.map((recipe) => (
                  <>
                  <TableRow key={recipe.id}>
                    <TableCell component="th" scope="row">
                      {recipe.name}
                    </TableCell>
                    <TableCell 
                    className={classes.tableCell}align="left">
                      <Rating
                        name="half-rating"
                        precision={0.25}
                        value={recipe.recipe_rating}
                        readOnly
                      />
                    </TableCell>
                    <TableCell
                    className={classes.tableCell} align="left">{recipe.time}</TableCell>
                    <IconButton
                      onClick={() => history.push(`/edit/${recipe.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleClickOpen}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableRow>
                  <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete your recipe?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button 
                    variant="contained" 
                    color="error"
                    onClick={handleClose}
                    endIcon={<CancelIcon/>}>Cancel</Button>

                    <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => handleDelete(recipe)} 
                    autoFocus
                    endIcon={<DeleteOutlineIcon/>}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
                </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
      <br></br>
      <LogOutButton 
      sx={{
        mb: 20
      }}
      className="btn logoutBtn" />
      <BottomNav />
    </div>
  );
}

export default Profile;
