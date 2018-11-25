const INITIAL_STATE = {
  token: '',
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'GET_TOKEN':
        return {
          ...state,
          token: action.token
        }

      default:
        return state
    }
}

export default authReducer
