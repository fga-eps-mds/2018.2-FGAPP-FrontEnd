const searchReducer = (state = [], action) => {
    console.log('REDUCER')
    console.log(action)
    console.log('FINISH REDUCER')
    switch (action.type) {
        case 'GET_LOCALS':
            return {
                ...state,
                locals: action.locals,
            }
        default:
            return state
    }
}

export default searchReducer
