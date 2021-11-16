import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* storeDetails(action) {
    try {
        const response = yield axios.get(`/api/details?id=${action.payload.id}`);
        yield put({ type: 'SET_DETAILS_ID', payload: response.data });
        console.log(response);
    } catch (err) {
        yield put({ type: 'SET_DETAILS_ERROR' });
        console.log(err);
    }
}

//watching for functions 
function* details() {
    yield takeLatest('STORE_DETAILS', storeDetails);
}


export default details;
