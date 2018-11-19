import React, { Component } from "react";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './reducers'
import SearchScreen from './screens/SearchScreen.js'
import TabHandlerIndicaAI from './TabHandlerIndicaAi'
const store = createStore(rootReducers)

class IndicaAiApp extends Component {

  render() {

    return (
        <Provider store={store}>
            <TabHandlerIndicaAI />
       </Provider>
    );
  }
}

export default IndicaAiApp;
