import React, { Component } from "react";
import {
  Text
} from "react-native";
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import { authAction } from '../actions'
import { bindActionCreators } from 'redux';

class HomeScreen extends Component {

  constructor(props){
    super();
    props.authAction(props.user_token)
  }

  render() {

    return (
        <Text>{this.props.user_token}</Text>
    );
  }
}

const mapStateToProps = store => ({})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ authAction }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
