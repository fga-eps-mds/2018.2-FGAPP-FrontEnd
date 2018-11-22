import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'
import { authAction } from '../actions'
import { bindActionCreators } from 'redux';
import SearchScreen from './SearchScreen.js'

const store = createStore(rootReducer)

class HomeScreen extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.user_token != undefined){
      this.props.authAction(nextProps.user_token)
    }
  }

  render() {

    return (
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  }
}

const mapStateToProps = store => ({})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ authAction }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
