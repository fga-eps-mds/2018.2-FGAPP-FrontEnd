import React, { Component } from "react";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './reducers'
import SearchScreen from './screens/SearchScreen.js'

import {StackNavigator, createStackNavigator} from 'react-navigation'

const store = createStore(rootReducers)

class IndicaAiApp extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { params } = this.props.navigation.state;
    var token = params ? params.token : null;

    return (
        <Provider store={store}>
            <SearchScreen />
       </Provider>
    );
  }
}

export default IndicaAiApp;
