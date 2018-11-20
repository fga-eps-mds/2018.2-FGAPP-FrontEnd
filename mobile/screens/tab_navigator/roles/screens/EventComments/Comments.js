import React, { Component } from 'react';
import { Card, CardItem, Left, Thumbnail, Body } from 'native-base';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import CommentItem from './components/CommentItem';
import Divider from '../EventProfile/components/Divider';
import CommentInput from './components/CommentInput';

const noPic = require('../../static/noPic.png');

class Comments extends Component {
    state = {
        loading: true,
        refreshing: false,
        comment: [],
        like: false
    };

    _getComments = () => {
        this.setState({ refreshing: true });
        fetch('http://roles-comments.herokuapp.com/comment/')
            .then(res => res.json())
            .then(resJson => {
                this.setState({ loading: false, comment: resJson });
            })
            .then(() => {
                this.setState({ refreshing: false });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                console.error(error);
            });
    };

    componentDidMount() {
        this._getComments();
    }

    render() {
        if (this.state.loading) {
            return (
                <View
                    style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator size="large" color="#00a50b" />
                </View>
            );
        }

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._getComments}
                    />
                }
            >
                <Card style={{ backgroundColor: 'white' }}>
                    <Text style={{ color: 'grey', marginBottom: 10 }}>
                        Comentários
                    </Text>

                    <CommentInput />

                    {this.state.comment.map((comment, index) => (
                        <CommentItem
                            key={index}
                            idComment={comment.id}
                            author={comment.author}
                            text={comment.text}
                            postDate={comment.created}
                            modifyDate={comment.edited}
                            like={comment.like}
                        />
                    ))}
                </Card>
            </ScrollView>
        );
    }
}

export default Comments;
