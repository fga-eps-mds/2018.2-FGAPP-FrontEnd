import React, { Component } from "react";
import {
  View, 
  StyleSheet, 
  ScrollView
} from "react-native";
import { connect } from 'react-redux';
import Local from "../components/Local";

class ListLocals extends Component {
  
    state = {
      locals: []
    };

    // Fucntion responsable to load all places before mount
    // the component by setting the state equal to result from fetch
    componentWillMount(){
      const url = fetch(`https://indicaai.herokuapp.com/locals/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "aplication/json"
        }
      })
      .then(response => response.json())
      .then(responseJson => {
        const localsFather = this.props.locals;
        this.setState({
          locals: responseJson,
        })
      }) 
      .catch(error => {
        console.log(error);
      });
    }

    // Function responsable update the component
    // when the state is diferent from parent props (locals.locals[0])
    componentWillReceiveProps(newProps) {
        if(newProps.locals !== undefined){
            this.setState({locals: newProps.locals })
        }
    }

    render() {

        const { locals } = this.state

        console.log('RENDER LIST')
        console.log(this.state)
        console.log('FINISH RENDER')


        return (
          <View style={styles.listLocals}> 
              <ScrollView>
                {this.state.locals
                .map(local => <Local name={local.name} description={local.description}  key={local.id}/>)} 
              </ScrollView>
          </View>
        );
    }
}

const mapStateToProps = store => (console.log('MAP STATE TO PROPS List'), console.log(store),{
    locals: store.searchReducer.locals
})

export default connect(mapStateToProps)(ListLocals);

const styles = StyleSheet.create({
  listLocals: {
    borderRadius: 5,
    marginHorizontal: 10,
  },

  LocalsText: {
    fontSize: 45,
    fontFamily: 'sans-serif',
    marginLeft: 5
 } 
});
