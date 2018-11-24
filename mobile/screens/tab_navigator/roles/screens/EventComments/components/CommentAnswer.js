import {
    Button,
    Icon,
    Text,
    ActionSheet,
    Root
} from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import * as helpers from '../../../utils/helpers';
// import LikeButton from './LikeButton';

const BUTTONS = [
    { text: 'Responder', icon: 'quote', iconColor: '#2c8ef4' },
    // { text: 'Editar', icon: 'hammer', iconColor: '#f42ced' },
    { text: 'Deletar', icon: 'trash', iconColor: '#fa213b' },
    { text: 'Cancelar', icon: 'close', iconColor: 'rgb(0,0,0)' }
];
const DESTRUCTIVE_INDEX = 1;
const CANCEL_INDEX = 2;

class CommentItem extends Component {
    state = {};

    _menuHandler = option => {
        switch (option) {
            case 0:
                // console.log('Apertou botão de resposta.');
                break;
            case 1:
                this.props.onDelete(this.props.id);
                break;

            case 2:
                break;
        }
    };

    render() {
        const { author, text, postDate } = this.props;
        return (
            <View
                style={{
                    marginLeft: '20%',
                    marginTop: 15,
                    borderLeftWidth: 1,
                    borderLeftColor: 'grey',
                    paddingLeft: 5
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Icon name="person" />
                    <Text
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {author}
                    </Text>
                    <Button
                        transparent
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                    title: 'Comentário de ' + author
                                },
                                buttonIndex => this._menuHandler(buttonIndex)
                            )
                        }
                    >
                        <Icon name="more" />
                    </Button>
                </View>

                <Text>{text}</Text>
                <Text style={{ color: 'grey', fontSize: 12 }}>
                    Postado em: {helpers.datetimeParser(postDate)}
                </Text>
            </View>
        );
    }
}

export default CommentItem;
