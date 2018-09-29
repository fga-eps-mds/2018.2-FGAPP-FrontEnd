import {
    Container, Header, Body,
    Content, Button, Icon,
    Card, CardItem, Text,
    Thumbnail, Left, Right,
} from "native-base";

import React, { Component } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
const logo = require("./images/logo.png");
const cardImage = require("./images/banner.png");

class FeedItem extends Component {
    render() {

        return (
            <Card style={styles.mb}>
                <CardItem>
                    <Left>
                        <Thumbnail source={logo} />
                        <Body>
                            <Text>User 1</Text>
                            <Text note>{this.props.nomeRole}</Text>
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
                        source={cardImage} />
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
                    <Right>
                        <Button transparent>
                            <Text> Read More</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    mb: {
        marginBottom: 5
    }
});
export default FeedItem;