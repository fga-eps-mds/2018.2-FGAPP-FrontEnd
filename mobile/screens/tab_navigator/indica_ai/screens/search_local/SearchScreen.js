import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { connect } from 'react-redux';
import { authAction } from '../../actions';
import SearchBar from "../../containers/searchBar";
import ListLocals from '../../containers/ListLocals';
import { bindActionCreators } from 'redux';


class SearchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token : props.navigation.state.params ? props.navigation.state.params.token : undefined
    };
  }

  componentWillMount() {
    const { token } = this.state
    if ( token !== undefined) {
      this.props.authAction(token)
    }
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
  token: store.authReducer.token
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ authAction }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
  }

});
