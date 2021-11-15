import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* selectedRecipe() {
    try {
        const response = yield axios.get('/api/details');
        yield put({ type: 'SET_DETAILS', payload: response.data });
    } catch (err) {
        yield put({ type: 'SET_DETAILS_ERROR' });
        console.log(err);
    }
}

//watching for functions 
function* detailsSaga() {
    yield takeLatest('STORE_DETAILS', selectedRecipe);
}


export default detailsSaga;
