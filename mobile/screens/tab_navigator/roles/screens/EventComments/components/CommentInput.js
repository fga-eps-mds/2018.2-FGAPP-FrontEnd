import React, { Component } from 'react';
import {
    Text,
    ToastAndroid,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import { Button, Toast } from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';
import Divider from '../../EventProfile/components/Divider';
import { ACTION_USER_DICTIONARY_INSERT } from 'expo/src/IntentLauncherAndroid';

class CommentInput extends Component {
    state = {
        author: '',
        text: '',
        answerId: null,
        created: null,
        edited: null,
        eventId: 0,
        responseStatus: 0,
        responseOk: false
    };

    _commentValidate() {
        if (this.state.author.length <= 1) {
            Alert.alert(
                'Erro ao postar o comentário',
                'Nome do Autor deve ter pelo menos 2 caracteres.'
            );
            return false;
        } else if (this.state.text.length <= 1) {
            Alert.alert(
                'Erro ao postar o comentário',
                'O comentário deve ter pelo menos 2 caracteres.'
            );
            return false;
        } else return true;
    }

    _postComment = async () => {
        if (this._commentValidate() == false)
            ToastAndroid.show(
                'Erro ao postar o comentário.',
                ToastAndroid.LONG
            );
        else {
            const { eventId, userId} = this.props;
            const {
                text,
                edited,
            } = this.state;

            fetch('http://roles-comments.herokuapp.com/comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    authorName: this.props.userInfo.name,
                    authorId: userId,
                    text,
                    answerId: 0,
                    created: moment().format('YYYY-MM-DD HH:mm:ss'),
                    edited,
                    eventId: eventId
                })
            })
                .then(response => {
                    this.setState({
                        responseStatus: response.status,
                        responseOk: response.ok
                    });
                    response.json();
                })
                .then(responseJson => {
                    // console.log(
                    //     `ResponseOk: ${responseOk}  //  Status: ${responseStatus}`
                    // );
                    if (
                        this.state.responseStatus >= 200 &&
                        this.state.responseStatus <= 202 &&
                        this.state.responseOk
                    ) {
                        // console.log(
                        //     'Comentário postado com sucesso!\n',
                        //     responseJson
                        // );
                        ToastAndroid.show(
                            'Comentário postado com sucesso!',
                            ToastAndroid.SHORT
                        );
                        this._textArea.clear();
                        this.props.onSubmit();
                    } else {
                        return Promise.reject();
                    }
                })
                .catch(() => {
                    Alert.alert(
                        'Erro ' + this.state.responseStatus,
                        'Houveram problemas na conexão. Tente novamente mais tarde.'
                    );
                });
        }
    };

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.textAreaAuthor}
                    placeholder="Autor"
                    underlineColorAndroid="transparent"
                    multiline={false}
                    onChangeText={text => this.setState({ author: text })}
                    maxLength={40}
                />

                <TextInput
                    ref={input => {
                        this._textArea = input;
                    }}
                    style={styles.textAreaComment}
                    placeholder="Novo Comentário"
                    underlineColorAndroid="transparent"
                    multiline={false}
                    onChangeText={text => this.setState({ text: text })}
                    maxLength={128}
                />
                <Button
                    success
                    block
                    style={styles.submitCommentBtn}
                    onPress={() => this._postComment()}
                >
                    <Text>Enviar Comentário</Text>
                </Button>
                <Divider size="80%" />
            </ScrollView>
        );
    }
}
export default CommentInput;

CommentInput.propTypes = {
    eventId: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
    textAreaAuthor: {
        width: '80%',
        alignSelf: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 5,
        padding: 10
    },
    textAreaComment: {
        height: 80,
        width: '80%',
        alignSelf: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10
    },
    submitCommentBtn: {
        marginTop: 20,
        width: '80%',
        alignSelf: 'center'
    }
});

