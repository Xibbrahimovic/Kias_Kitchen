const reviewsCount = (state = 0, action) => {
    switch(action.type){
        case 'SET_REVIEWS_COUNT':
            return action.payload;
        default:
            return state;
    }
}

export default reviewsCount;
