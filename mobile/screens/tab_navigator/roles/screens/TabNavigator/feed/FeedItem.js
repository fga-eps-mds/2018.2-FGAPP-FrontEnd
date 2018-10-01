import {
    Body, Button, Icon,
    Card, CardItem, Text,
    Thumbnail, Left, Right,
} from "native-base";

import React, { Component } from "react";
import { StyleSheet, Image, View, ScrollView } from "react-native";
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
                            <Text>{this.props.nomeRole}</Text>
                            <Text note>{this.props.org}</Text>
                        </Body>
                    </Left>
                </CardItem>
                
                <CardItem cardBody>
                    <Image
                        style={{
                            resizeMode: "cover",
                            width: null,
                            height: 200,
                            flex: 1
                        }}
                        source={{uri:this.props.imgRole}} />
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
                            <View>
                                <Text style={{textAlign: 'center'}}>8 Comentários</Text>
                            </View>
                        </Button>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text> Saiba Mais</Text>
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
        marginBottom: 15
    }
});
export default FeedItem;