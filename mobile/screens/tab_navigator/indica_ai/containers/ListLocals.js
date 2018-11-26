import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../actions'
import Local from "../components/Local";
import Publicity from "../components/Publicity";
import IconMessage from "../components/IconMessage";
import { withNavigation } from 'react-navigation';

class ListLocals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
        locals: []
    };
  }

  // Fucntion responsable to load all places before mount
  // the component by setting the state equal to result from fetch
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
      fetch(`${process.env.INDICA_AI_API}/locals/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "aplication/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.searchAction(responseJson)
      })
      .catch(error => {
        console.log(error);
      });
  }
  // Function responsable update the component
  // when the state is diferent from parent props (locals.locals[0])
  componentWillReceiveProps(newProps) {
    if (newProps.locals !== undefined) {
      this.setState({ locals: newProps.locals })
    }
  }
  _onRefresh = () => {
  this.setState({refreshing: true});
  this.getData().then(() => {
    this.setState({refreshing: false});
  });
}

  render() {
    const { locals } = this.state
    locals.reverse()
    if (locals.length == 0) {
      return (
        <IconMessage
          message='Nenhum resultado encontrado'
          icon='sad'
        />
      )
    } else {
      return (


        <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardDismissMode='on-drag'
        refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }
        >

          {locals.map(local =>
            local.publicity == 'true' ?
              <Publicity
                local={local}
                key={local.id}
              />
              :
              null
          )}

          {locals.map(local =>
            local.publicity == 'false' ?
              <Local
                local={local}
                key={local.id}
              />
              :
              null
          )}

        </ScrollView>

      );
    }
  }
}

const mapStateToProps = store => ({
  locals: store.searchReducer.locals
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ searchAction }, dispatch)
)

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLocals));
