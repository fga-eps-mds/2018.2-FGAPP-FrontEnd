import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { authAction } from '../../actions'
import SearchBar from "../../containers/searchBar";
import ListLocals from '../../containers/ListLocals';
import { bindActionCreators } from 'redux';


class SearchScreen extends Component {
 componentDidMount(){
   const { state } = this.props.navigation;
   var token = state.params ? state.params.token : undefined;
   this.props.authAction(token)
 }
  render() {
      return (
          <View style={styles.container}>
              <SearchBar />
              <ListLocals />
          </View>
      );
  }
}

const mapStateToProps = store => ({
    locals: store.authReducer.token
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ authAction }, dispatch)
)

export default connect(mapStateToProps,
  mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
  }

});
