export default searchReducer = (state =[], action) => {
    switch(action.type){
        case 'SEARCH':
        console.log(action)
            return {
                ...state,
                locals: action.locals
            };
        default:
            return state;
    }
};
