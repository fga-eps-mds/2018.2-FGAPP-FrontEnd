import React, { Component } from 'react';
import { Card, Button } from 'native-base';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    ToastAndroid,
    Alert
} from 'react-native';
import jwt_decode from 'jwt-decode';
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
    
    _loadProfile = async () => {
        const { state } = this.props.navigation;
        const token = state.params ? state.params.token : undefined;
        const user = jwt_decode(token);

        const profileInfoPath = `${process.env.INTEGRA_LOGIN_AUTH}/api/users/get_profile/`;
        fetch(profileInfoPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'user_id': user.user_id,
          }),
        })
        .then((response) => { return response.json() })
        .then((responseJson) => {
          if (!responseJson.error) {
            this.setState({ profileInfo: responseJson });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

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

    componentDidMount() {
        this._getComments();
        this._loadProfile();
    }

    _deleteComment(id) {
        return fetch(
            'http://roles-comments.herokuapp.com/comment/' + id + '/',
            {
                method: 'delete'
            }
        )
            .then(res => {
                if (res.ok) {
                    ToastAndroid.show(
                        'Comentário apagado!',
                        ToastAndroid.SHORT
                    );
                    this._getComments();
                    return res;
                } else {
                    Promise.reject();
                }
            })
            .catch(() => {
                Alert.alert('ERRO', 'Houve um erro ao deletar comentário!');
            });
    }

    render() {
        const { params } = this.props.navigation.state;
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
                        username={this.state.profileInfo.name ? this.state.profileInfo.name : 'Nome de Usuário'}
                    />

                    {this.state.comments.map((comment, index) => (
                        <View key={index}>
                            {comment.answerId === 0 && (
                                <View>
                                    <CommentItem
                                        id={comment.id}
                                        author={comment.author}
                                        text={comment.text}
                                        postDate={comment.created}
                                        modifyDate={comment.edited}
                                        onDelete={id => this._deleteComment(id)}
                                    />
                                    {this.state.comments.map(
                                        (answer, indexAnswer) =>
                                            comment.id == answer.answerId && (
                                                <CommentAnswer
                                                    key={indexAnswer}
                                                    id={answer.id}
                                                    author={answer.author}
                                                    text={answer.text}
                                                    postDate={answer.created}
                                                    modifyDate={answer.edited}
                                                    onDelete={id =>
                                                        this._deleteComment(id)
                                                    }
                                                />
                                            )
                                    )}
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
