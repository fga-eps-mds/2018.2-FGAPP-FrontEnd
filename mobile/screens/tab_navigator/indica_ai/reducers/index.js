import { combineReducers } from 'redux';
import searchReducer from './searchReducer'
import authReducer from './authReducer'
import favoriteReducer from './favoriteReducer'

export default combineReducers({
    searchReducer,
    authReducer,
    favoriteReducer

})
