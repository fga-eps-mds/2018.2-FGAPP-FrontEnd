export default searchReducer = (state =[], action) => {
    console.log('ola')
    switch(action.type){
        case 'SEARCH':
        console.log('ola2')
        console.log(action)
            return {
                ...state,
                locals: action.locals
            };
        default:
            return state;
    }
};
