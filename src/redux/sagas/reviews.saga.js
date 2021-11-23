import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';


function* fetchReviewCount(action) {
    try {
        const response = yield axios.get(`/api/reviews/?id=${action.payload}`);
        console.log('response',response);
        yield put({ type: 'SET_REVIEWS_COUNT', payload: response.data });
    } catch (err) {
        yield put({ type: 'SET_REVIEWS_COUNT_ERROR' });
        console.log(err);
    }
}

function* fetchAllReviews(action) {
    try {
        const response = yield axios.get(`/api/reviews/${action.payload}`);
        console.log('response',response);
        yield put({ type: 'SET_ALL_REVIEWS', payload: response.data });
    } catch (err) {
        yield put({ type: 'SET_ALL_REVIEWS_ERROR' });
        console.log(err);
    }
}

//watching for functions 
function* reviews() {
    yield takeLatest('FETCH_REVIEW_COUNT', fetchReviewCount);
    yield takeLatest('FETCH_ALL_REVIEWS', fetchAllReviews)
}


export default reviews;
