import React, { Component } from 'react';
import { CardItem, Icon, Left } from 'native-base';
import { View, Text, TouchableOpacity } from 'react-native';

class CardsDetalhes extends Component {
    render() {
        const MAX_LENGTH = 40;
        return (
            <TouchableOpacity
                style={{ marginBottom: 10, width: '100%' }}
                onPress={
                    this.props.descricao.length > MAX_LENGTH
                        ? this.props.onPressCard
                        : null
                }
            >
                <View
                    style={{
                        alignSelf: 'center',
                        width: '90%'
                    }}
                >
                    <CardItem
                        bordered
                        style={{ alignSelf: 'center', height: 40 }}
                    >
                            <Icon
                                style={{ color: this.props.color }}
                                name={this.props.icon}
                            />
                            <Text> {this.props.label}</Text>

                        {this.props.descricao.length > MAX_LENGTH && (
                            <Text style={{ color: 'grey' }}>Ver Mais</Text>
                        )}
                    </CardItem>

                    <View
                        style={{
                            width: '100%',
                            borderWidth: 0.25,
                            borderColor: 'rgba(0,0,0,0.25)',
                            alignSelf: 'center'
                        }}
                    />

                    <CardItem
                        style={{
                            backgroundColor: '#f2f2f2',
                            height: 50,
                            backgroundColor: 'white'
                        }}
                    >
                        <Text style={{ textAlign: 'center' }}>
                            {this.props.descricao.length > MAX_LENGTH
                                ? this.props.descricao.slice(
                                      0,
                                      MAX_LENGTH / 2
                                  ) + '...'
                                : this.props.descricao}
                        </Text>
                    </CardItem>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CardsDetalhes;
