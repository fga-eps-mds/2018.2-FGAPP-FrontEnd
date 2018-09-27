export default searchReducer = (state =[], action) => {
    console.log('ola')
    switch(action.type){
        case 'SEARCH':
        console.log('ola2')
        console.log(action)
            return {
                ...state,
                inputValue: 'action.newText'
            };
        default:
            return state;
    }
};

