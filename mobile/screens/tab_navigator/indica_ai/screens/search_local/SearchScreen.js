import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { connect } from 'react-redux';
<<<<<<< HEAD
import { authAction } from '../../actions'
=======
import { bindActionCreators } from 'redux';
import { authAction } from '../../actions';
>>>>>>> ec66c6c91cc91ccfc0f064d218d963651a95dda1
import SearchBar from "../../containers/searchBar";
import ListLocals from '../../containers/ListLocals';
import { bindActionCreators } from 'redux';


class SearchScreen extends Component {
<<<<<<< HEAD
 componentDidMount(){
   const { state } = this.props.navigation;
   var token = state.params ? state.params.token : undefined;
   this.props.authAction(token)
 }
=======

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

>>>>>>> ec66c6c91cc91ccfc0f064d218d963651a95dda1
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
<<<<<<< HEAD
    locals: store.authReducer.token
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({ authAction }, dispatch)
)

export default connect(mapStateToProps,
  mapDispatchToProps)(SearchScreen);
=======
  token: store.authReducer.token
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({ authAction }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);

// export default SearchScreen;
>>>>>>> ec66c6c91cc91ccfc0f064d218d963651a95dda1

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
  }

});
