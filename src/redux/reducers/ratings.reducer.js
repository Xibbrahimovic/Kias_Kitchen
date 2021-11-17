const ratings = (state = [], action) => {
    switch(action.type){
        case 'SET_RATINGS':
            return action.payload;
        default:
            return state;
    }
}

export default ratings;
