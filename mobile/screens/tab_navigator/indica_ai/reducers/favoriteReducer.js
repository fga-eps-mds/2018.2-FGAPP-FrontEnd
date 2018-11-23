const INITIAL_STATE = {
    favorites: '',
}

const favoriteReducer = (state = INITIAL_STATE, action) => {
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
