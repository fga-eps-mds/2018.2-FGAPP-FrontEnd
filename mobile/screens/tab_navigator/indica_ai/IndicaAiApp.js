import React, { Component } from "react";
import {
  Text
} from "react-native";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { authAction } from './actions'
import rootReducer from './reducers'
import HomeScreen from './screens/HomeScreen'

const store = createStore(rootReducer)

class IndicaAiApp extends Component {


  render() {

    const {state} = this.props.navigation;
    var token = state.params ? state.params.token : undefined;

    return (
      <Provider store={store}>
        <HomeScreen user_token={token} />
      </Provider>
    );
  }
}

export default IndicaAiApp;
