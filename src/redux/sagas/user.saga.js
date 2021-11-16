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

function* deleteRecipe(action){
try {
  const response = yield axios.delete(`/api/user/${action.payload.id}`);
  console.log(action.payload);
  console.log(response);
  yield put({type: 'FETCH_USER_RECIPES'})
} catch (error) {
  console.log('Error in deleteRecipe', err);
  yield put({type: 'DELETE_ERROR' })
}
};

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_RECIPES', fetchUserRecipes);
  yield takeLatest('DELETE_RECIPE', deleteRecipe);
}

export default userSaga;
