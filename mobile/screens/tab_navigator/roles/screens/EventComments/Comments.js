import React, { Component } from 'react';
import { Card } from 'native-base';
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
import Divider from '../EventProfile/components/Divider';
import CommentInput from './components/CommentInput';

class Comments extends Component {
    state = {
        loading: true,
        refreshing: false,
        comments: [],
        like: false,
        profileInfo: {},
    };

    _loadProfile = async () => {
        const { state } = this.props.navigation;
        const token = state.params ? state.params.token : undefined;
        const user = jwt_decode(token);
        this.setState({ userId: user.user_id });

        const profileInfoPath = `${
            process.env.INTEGRA_LOGIN_AUTH
        }/api/users/get_profile/`;
        fetch(profileInfoPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.user_id
            })
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (!responseJson.error) {
                    this.setState({ profileInfo: responseJson });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    _getComments = () => {
        const { params } = this.props.navigation.state;
        this.setState({ refreshing: true });
        fetch('http://roles-comments.herokuapp.com/comment/?eventID='+params.idRole)
            .then(res => res.json())
            .then(resJson => {
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
                        userInfo={this.state.profileInfo}
                        userId={this.state.userId ? this.state.userId : 0}
                    />

                    {this.state.comments.map((comment, index) => (
                        <View key={index}>
                            <CommentItem
                                id={comment.id}
                                author={comment.authorName}
                                text={comment.text}
                                postDate={comment.created}
                                modifyDate={comment.edited}
                                onDelete={id => this._deleteComment(id)}
                                menu={ (comment.authorName === this.state.profileInfo.name) }
                            />
                            <Divider size="80%" />
                        </View>
                    ))}
                </Card>
            </ScrollView>
        );
    }
}

export default Comments;
