import { combineReducers } from 'redux'
import searchBar from './searchBar'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    searchBar,
    visibilityFilter
})