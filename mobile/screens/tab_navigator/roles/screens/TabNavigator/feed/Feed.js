import {
    Container, Header, Body,
    Content, Button, Icon,
    Card, CardItem, Text,
    Thumbnail, Left, Right  } from "native-base";
  
import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

const logo=  require("./images/logo.png");
const cardImage = require("./images/banner.png");

class Feed extends React.Component {   
    constructor(props) {
        super(props);
        this.state = { loading: true };
      }
      async componentWillMount() {
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loading: false });
      }
    render() {
        if(this.state.loading){
            return <Expo.AppLoading />;
        }
        return (
            <Container style ={StyleSheet.container}>
                <Header>
                    <Body>
                        <Text>Rolê 1 (nome do rolê)</Text>
                    </Body>
                </Header>
                <Content padder>
            <Card style={styles.mb}>
                <CardItem>
                <Left>
                    <Thumbnail source={logo} />
                    <Body>
                    <Text>User 1</Text>
                    <Text>Going to Rolê!</Text>
                    </Body>
                </Left>
                </CardItem>

                <CardItem cardBody>
                <Image
                    style={{
                    resizeMode: "cover",
                    width: null,
                    height: 150,
                    flex: 1
                    }}
                    source={cardImage}
                />
                </CardItem>

                <CardItem style={{ paddingVertical: 0 }}>
                    <Left>
                        <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>11 Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>89 Comments</Text>
                        </Button>
                    </Body>
                    </CardItem>
                </Card>
            </Content>
            </Container>
                
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF"
    },
    mb: {
      marginBottom: 15
    }
  });

export default Feed;