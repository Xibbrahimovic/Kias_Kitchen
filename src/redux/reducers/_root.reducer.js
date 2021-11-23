import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import home from './home.reducer';
import details from './details.reducer';
import userRecipes from './userRecipes.reducer';
import reviewsCount from './reviewsCount.reducer';
import reviews from './reviews.reducer';
// import ratings from './ratings.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  home,//will contain all the recipes available on home page
  details,//will contain the entire recipe object when clicked on
  userRecipes,//will contain the recipes based on user
  // ratings,
  reviewsCount,
  reviews,
});

export default rootReducer;
