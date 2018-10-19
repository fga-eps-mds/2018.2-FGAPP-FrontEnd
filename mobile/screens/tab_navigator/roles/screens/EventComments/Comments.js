import React, { Component } from "react"
import {Card, CardItem, Left, Thumbnail, Body} from "native-base"
import { View, Text, FlatList } from "react-native"

const noPic = require("../TabNavigator/feed/images/noPic.png")

class Comments extends Component {
    state = {
        loading: true,
        comment: ""
    }

    _getDadosRole = () => {
        fetch("https://5bc7da788bfe5a00131b6e6d.mockapi.io/comments/")
            .then(res => res.json())
            .then(resJson => {
                this.setState({ loading: false,  comment: resJson})
                console.log(resJson)
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
                console.error(error)
            })
    }

    componentDidMount() {
       this._getDadosRole()
    }

    render() {
        const {comment} = this.state
        if(this.state.loading) {
            return (
                <View>
                    <Text>
                        Carregando...
                        {this.state.comment}
                    </Text>
                </View>
            )
        }
        return (
            <Card>
                <Text>Comentarios.</Text>
                <CardItem>
                <Left>
                    <Thumbnail
                        source={noPic}
                    />
                </Left>
                <Body>
                    <Text>
                        Lista de comentários aqui.
                        {
                            //this.state.comment
                        }
                    </Text>
                </Body>

                </CardItem>
            </Card>
        );
    }
}

export default Comments
