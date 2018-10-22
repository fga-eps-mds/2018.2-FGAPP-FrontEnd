import React, { Component } from "react";
import {
  Text
} from "react-native";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const tokenState = {
  token: ''
}

const reducer = (tokenState) => {
  return tokenState
}

const store = createStore(reducer)

class IndicaAiApp extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : "<undefined>";
    tokenState.token = null ? '' : token
    //alert(tokenState.token)

    return (
      <Provider store={store}>
        <Text>sla</Text>
      </Provider>
    );
  }
}

export default IndicaAiApp;
