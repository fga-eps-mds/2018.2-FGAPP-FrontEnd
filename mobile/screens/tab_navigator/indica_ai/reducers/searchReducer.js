const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_LOCALS':
            return {
                ...state,
                locals: action.locals,
                requestLocals: false
            }
        default:
            return state
    }
}

export default searchReducer
