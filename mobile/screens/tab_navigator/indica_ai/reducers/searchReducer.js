const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_LOCALS':
            return {
                ...state,
                locals: action.locals
            }
        default:
            return state
    }
}

export default searchReducer
