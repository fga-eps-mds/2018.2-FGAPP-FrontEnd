import React, { Component } from "react"
import {Card, CardItem, Left, Thumbnail, Body} from "native-base"
import { View, Text, FlatList, ScrollView } from "react-native"

import CommentItem from './components/CommentItem'

const noPic = require("../../static/noPic.png")

class Comments extends Component {
    state = {
        loading: true,
        comment: []
    }

    _getDadosRole = () => {
        fetch("https://5bc7da788bfe5a00131b6e6d.mockapi.io/eventComments/")
            .then(res => res.json())
            .then(resJson => {
                this.setState({ loading: false,  comment: resJson})
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
            <ScrollView>
                {this.state.comment.map((comment, index)=> (
                    <CommentItem
                        key={index}
                        idComment={comment.id}
                        author={comment.author}
                        comment={comment.comment}
                        postDate={comment.postDateTime}
                        modifyDate={comment.modifyDateTime}
                    />
                ))}
            </ScrollView>
        )
    }
}

export default Comments
