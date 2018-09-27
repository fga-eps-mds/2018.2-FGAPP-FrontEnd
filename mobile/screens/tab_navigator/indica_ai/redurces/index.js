import { combineReducers } from 'redux'
import searchReducer from './searchBar'

export const Reducers = combineReducers({
    searchBar: searchReducer
})