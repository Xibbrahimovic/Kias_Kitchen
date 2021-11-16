const userRecipes = (state = [], action) => {
    switch(action.type){
        case 'SET_USER_RECIPES':
            return action.payload;
        default:
            return state;
    }
}

export default userRecipes;
