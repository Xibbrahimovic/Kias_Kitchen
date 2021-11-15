import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* fetchRecipes() {
    try {
        const response = yield axios.get('/api/home');
        yield put({ type: 'SET_RECIPES', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_RECIPES_ERROR' });
        console.log(err);
    }
}

//watching for functions 
function* homeSaga() {
    yield takeLatest('FETCH_RECIPES', fetchRecipes)

}


export default homeSaga;
