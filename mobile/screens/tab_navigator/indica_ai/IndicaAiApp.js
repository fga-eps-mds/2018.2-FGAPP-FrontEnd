import React, { Component } from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from './reducers';
import TabHandlerIndicaAI from './TabHandlerIndicaAi';


const store = createStore(rootReducers)

export default class IndicaAiApp extends Component {

  render() {

    return (
        <Provider store={store}>
            <TabHandlerIndicaAI />
       </Provider>
    );
  }
}
