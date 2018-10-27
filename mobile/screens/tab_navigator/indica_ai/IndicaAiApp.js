import React, { Component } from "react";
import {
  Text
} from "react-native";
import { createStore } from 'redux'
import rootReducers from './reducers'
import SearchScreen from './screens/SearchScreen.js'
import TabHandlerIndicaAI from './TabHandlerIndicaAi'
const store = createStore(rootReducers)

class IndicaAiApp extends Component {


  render() {

    const {state} = this.props.navigation;
    var token = state.params ? state.params.token : undefined;

    return (
        <Provider store={store}>
            <TabHandlerIndicaAI />
       </Provider>
    );
  }
}

export default IndicaAiApp;
