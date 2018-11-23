const favoriteReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_FAVORITES':
            return {
                ...state,
                favorites: action.favorites
            }
        default:
            return state
    }
}

export default favoriteReducer
