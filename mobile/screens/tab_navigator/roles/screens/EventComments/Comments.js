import React, { Component } from 'react';
import { Card, Button } from 'native-base';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import CommentItem from './components/CommentItem';
import CommentAnswer from './components/CommentAnswer';
import Divider from '../EventProfile/components/Divider';
import CommentInput from './components/CommentInput';

class Comments extends Component {
    state = {
        loading: true,
        refreshing: false,
        comments: [],
        like: false
    };

    _getComments = () => {
        const { params } = this.props.navigation.state;
        this.setState({ refreshing: true });
        fetch('http://roles-comments.herokuapp.com/comment/')
            .then(res => res.json())
            .then(resJson => {
                resJson = resJson.filter(comment => {
                    if (comment.eventId === params.idRole) {
                        return comment;
                    }
                });
                this.setState({ loading: false, comments: resJson });
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

    _teste = (comment) => {
      console.log('DEBUG',comment)
    }

    componentDidMount() {
        this._getComments();
    }

    render() {
        const { params } = this.props.navigation.state;
        let answers
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
                        Comentários - {params.eventName}
                    </Text>

                    <CommentInput
                        eventId={params.idRole}
                        onSubmit={this._getComments}
                    />

                    {this.state.comments.map((comment, index) => (
                        <View key={index}>
                            {comment.answerId === 0 && (
                                <View>
                                    <CommentItem
                                        idComment={comment.id}
                                        author={comment.author}
                                        text={comment.text}
                                        postDate={comment.created}
                                        modifyDate={comment.edited}
                                    />
                                    {this.state.comments.map( (answer, indexAnswer) => (
                                      comment.id == answer.answerId && (
                                        <CommentAnswer 
                                          key={indexAnswer}
                                          author={answer.author}
                                          text={answer.text}
                                          postDate={answer.created}
                                          modifyDate={answer.edited}
                                        />
                                      )
                                    ))}
                                    <Divider size="80%" />
                                </View>
                            )}
                        </View>
                    ))}
                </Card>
            </ScrollView>
        );
    }
}

export default Comments;
