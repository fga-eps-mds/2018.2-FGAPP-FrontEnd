import { Button, Icon, Text, ActionSheet, Root } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import * as helpers from '../../../utils/helpers';
// import LikeButton from './LikeButton';

const BUTTONS = [
    // { text: 'Responder', icon: 'quote', iconColor: '#2c8ef4' },
    // { text: 'Editar', icon: 'hammer', iconColor: '#f42ced' },
    { text: 'Deletar', icon: 'trash', iconColor: '#fa213b' },
    { text: 'Cancelar', icon: 'close', iconColor: 'rgb(0,0,0)' }
];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

class CommentItem extends Component {
    state = {};

    _menuHandler = option => {
        switch (option) {
            case 0:
                this.props.onDelete(this.props.id);
                break;
            case 1:
                break;
        }
    };

    render() {
        return (
            <Root>
                <View style={{ width: '80%', alignSelf: 'center' }}>
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
                                fontWeight: 'bold',
                                textAlignVertical: 'center'
                            }}
                        >
                            {this.props.author}
                        </Text>
                        <Button
                            transparent
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: CANCEL_INDEX,
                                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                        title:
                                            'Comentário de ' + this.props.author
                                    },
                                    buttonIndex =>
                                        this._menuHandler(buttonIndex)
                                )
                            }
                        >
                            <Icon name="more" />
                        </Button>
                    </View>

                    <Text>{this.props.text}</Text>

                    <Text style={{ color: 'grey', fontSize: 12 }}>
                        Postado em:{' '}
                        {helpers.datetimeParser(this.props.postDate)}
                    </Text>
                    {this.props.modifyDate != null && (
                        <Text
                            style={{
                                color: 'grey',
                                fontSize: 12
                            }}
                        >
                            Modificado em:{' '}
                            {helpers.datetimeParser(this.props.modifyDate)}
                        </Text>
                    )}
                    {/* <LikeButton /> */}
                </View>
            </Root>
        );
    }
}

export default CommentItem;
