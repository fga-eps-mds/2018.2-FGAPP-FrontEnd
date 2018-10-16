import React, { Component } from "react";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './reducers'
import SearchScreen from './screens/SearchScreen.js'

const store = createStore(rootReducers)

class IndicaAiApp extends Component {

  render() {

    return (
        <Provider store={store}>
            <SearchScreen />
       </Provider>
    );
  }
}

export default IndicaAiApp;
