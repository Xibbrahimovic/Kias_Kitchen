import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)

    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchUserRecipes() {
  try {
      const response = yield axios.get(`/api/user/recipes`);
      yield put({ type: 'SET_USER_RECIPES', payload: response.data });
      console.log(response);
  } catch (err) {
      yield put({ type: 'SET_USER_RECIPES_ERROR' });
      console.log(err);
  }
}

function* addRecipe(action){
  try {
    yield axios.post('/api/user/recipe', action.payload);
    yield put({type: 'FETCH_RECIPES'})
  } catch (error) {
    console.log('Error in add recipes saga', error);
  }
};

  

function* deleteRecipe(action){
try {
  const response = yield axios.delete(`/api/user/${action.payload}`);
  console.log(action.payload);
  console.log(response);
  yield put({type: 'FETCH_USER_RECIPES'})
} catch (error) {
  console.log('Error in deleteRecipe', error);
  yield put({type: 'DELETE_ERROR' })
}
};

function* addReview(action){
  try {
    const response = yield axios.post(`/api/user/review/${action.payload.recipe_id}`, action.payload);
    console.log("Add Review action.payload",action.payload);
    console.log("Add Review response",response);
    //yield put({type: 'FETCH_REVIEWS'});
  } catch (error) {  
    console.log('Error in addReview', error);
    yield put({type: 'ADD_REVIEW_ERROR' })
  }
}

function* editRecipe(action){
  try {
    const response = yield axios.put(`/api/user/edit/${action.payload.recipe_id}`, action.payload);
    console.log(action.payload);
    console.log(response);
    yield put({type: 'FETCH_USER_RECIPES'})
  } catch (error) {
    console.log('Error in editRecipe', error);
    yield put({type: 'EDIT_RECIPE_ERROR' })
  }
  };
  


function* fetchFavorites(){
  try {
    const response = yield axios.get(`/api/user/favorites/`);
    // console.log('This is the fetchFavorites GET response', action.payload);
    console.log('This is the fetchFavorites GET response', response);
    yield put({type: 'SET_FAVORITES', payload: response.data});
  } catch (error) {
    console.log('Error in fetchFavorites', error);
    yield put({type: 'FETCH_FAVORITES_ERROR' })
  }
}

function* addFavorite(action){
  try {
    const response = yield axios.post(`/api/user/favorites/${action.payload.id}`, action.payload);
    console.log('SAGA - response from addFavorites post route:', response);
    yield put({type: 'FETCH_RECIPES'});
  } catch (error) {
    console.log('Error in the SAGA, addFavorite post route', error);
  }
}

function* deleteFavorite(action){
  try {
    const response = yield axios.delete(`/api/user/deletefavorite${action.payload.id}`);
    console.log(action.payload);
    console.log(response);
    yield put({type: 'FETCH_RECIPES'})
  } catch (error) {
    console.log('Error in deleteFavorite', error);
    yield put({type: 'DELETE_FAVORITE_ERROR' })
  }
  };


function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_RECIPES', fetchUserRecipes);
  yield takeLatest('ADD_RECIPE', addRecipe);
  yield takeLatest('ADD_REVIEW', addReview);
  yield takeLatest('DELETE_RECIPE', deleteRecipe);
  yield takeLatest('EDIT_RECIPE', editRecipe);
  yield takeLatest('FETCH_FAVORITES', fetchFavorites);
  yield takeLatest('ADD_FAVORITE', addFavorite);
  yield takeLatest('DELETE_FAVORITE', deleteFavorite);
}

export default userSaga;
