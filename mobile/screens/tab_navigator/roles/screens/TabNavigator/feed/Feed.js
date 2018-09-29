import {
    Container, Header, Body,
    Content, Button, Icon,
    Card, CardItem, Text,
    Thumbnail, Left, Right  } from "native-base";
  
  import React, { Component } from "react";
  import { StyleSheet, Image } from "react-native";

export default class Feed extends Component {
    render() {
        return (
            <Container style ={StyleSheet.container}>
                <Header>
                    <Body>
                        <Text>Rolê 1 (nome do rolê)</Text>
                    </Body>
                </Header>




            </Container>
                
        );
    }
}

