import React, { Component } from 'react';
import { Card } from 'native-base';
import { StyleSheet, View } from 'react-native';

import CardsDetalhes from './CardsDetalhes';
import DescModals from './DescModals';
import CardHeader from './CardHeader';
import Divider from './Divider';

class Detalhes extends Component {
    state = {
        detailsModalVisible: false,
        drinksModalVisible: false,
        foodsModalVisible: false
    };

    _toggleModal = modal => {
        if (modal == 'details')
            this.setState({
                detailsModalVisible: !this.state.detailsModalVisible
            });
        else if (modal == 'drinks')
            this.setState({
                drinksModalVisible: !this.state.drinksModalVisible
            });
        else if (modal == 'foods')
            this.setState({ foodsModalVisible: !this.state.foodsModalVisible });
    };

    render() {
        return (
            <View>

                <DescModals
                    visible={this.state.drinksModalVisible}
                    goBack={() => this._toggleModal('drinks')}
                    icon="beer"
                    headerLabel="Drinks"
                    text={this.props.drinks}
                    color="#B79200"
                />

                <DescModals
                    visible={this.state.foodsModalVisible}
                    goBack={() => this._toggleModal('foods')}
                    icon="pizza"
                    headerLabel="Comidas"
                    text={this.props.foods}
                    color="red"
                />

                <Card>
                    {this.props.drinks.length > 0 && (
                        <View>
                            <CardsDetalhes
                                onPressCard={() => this._toggleModal('drinks')}
                                descricao={this.props.drinks}
                                icon="beer"
                                label="Drinks"
                                color="#b79200"
                            />
                            <Divider size="100%"/>
                        </View>
                    )}

                    {this.props.foods.length > 0 && (
                        <CardsDetalhes
                            onPressCard={() => this._toggleModal('foods')}
                            descricao={this.props.foods}
                            icon="pizza"
                            label="Comidas"
                            color="#f23a3a"
                        />
                    )}
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default Detalhes;
