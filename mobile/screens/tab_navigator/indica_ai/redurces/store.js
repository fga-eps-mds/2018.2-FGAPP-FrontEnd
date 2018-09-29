import { createStore, combineReducers } from 'redux'
import searchReducer from './searchBar'

export const Reducers = combineReducers({
    searchBar: searchReducer,
});

const store = createStore(Reducers);

export default store;
