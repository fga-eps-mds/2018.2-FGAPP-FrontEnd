import React, { Component } from 'react';
import { Card, CardItem, Icon, Left } from 'native-base';
import { Text, TouchableOpacity } from 'react-native';

class CardsDetalhes extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{ marginBottom: 10, width: '100%' }}
                onPress={
                    this.props.descricao.length > 200
                        ? this.props.onPressCard
                        : null
                }
            >
                <Card
                    style={{
                        alignSelf: 'center',
                        width: '90%'
                    }}
                >
                    <CardItem
                        style={{
                            backgroundColor: '#f2f2f2',
                            height: 100
                        }}
                    >
                        <Text style={{ textAlign: 'center' }}>
                            {this.props.descricao.length > 200
                                ? this.props.descricao.slice(0, 100) + '...'
                                : this.props.descricao}
                        </Text>
                    </CardItem>

                    <CardItem bordered style={{ alignSelf: 'center' }}>
                        <Left>
                            <Icon
                                style={{ color: this.props.color }}
                                name={this.props.icon}
                            />
                            <Text> {this.props.label}</Text>
                        </Left>

                        {this.props.descricao.length > 200 && (
                            <Text style={{ color: 'grey' }}>Ver Mais</Text>
                        )}
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}

export default CardsDetalhes;
