import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* storeDetails(action) {
    try {
        const response = yield axios.get(`/api/details?id=${action.payload.id}`);
        console.log('response',response);
        yield put({ type: 'SET_DETAILS_ID', payload: response.data });
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
