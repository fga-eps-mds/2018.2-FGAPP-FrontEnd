import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet, 
  ScrollView
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../actions'
import Local from "../components/Local";
import IconMessage from "../components/IconMessage";

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
        this.props.searchAction(responseJson)
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

        if(locals.length == 0) {
            return (
                <IconMessage
                    message='Nenhum resultado encontrado'
                    icon='sad'
                 />
            )
        } else {

          return (
            <ScrollView>
              {locals.map( local =>
                  <Local
                    name={local.name}
                    description={local.description}
                    key={local.id}
                  />
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
    bindActionCreators({ searchAction }, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(ListLocals);
