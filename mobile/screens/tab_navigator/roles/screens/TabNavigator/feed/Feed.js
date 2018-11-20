import { Icon, Text } from 'native-base';

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import FeedItem from './FeedItem';
import * as helpers from '../../../utils/helpers';

const Roboto = require('native-base/Fonts/Roboto.ttf');
const Roboto_medium = require('native-base/Fonts/Roboto_medium.ttf');
const Ionicons = require('@expo/vector-icons/fonts/Ionicons.ttf');

class Feed extends Component {
    state = {
        loading: false,
        roles: [],
        refreshing: false,
        feedInit: true,
        zeroRoles: false
    };

    async componentWillMount() {
      Expo.Font.loadAsync({
            Roboto,
            Roboto_medium,
            Ionicons,
      })
        .then( () => {
          this.setState({ loading: false });
        })

        .catch( () => {});
    }

    _refreshFeed = () => {
        this.state.feedInit == true && this.setState({ feedInit: false });
        this.setState({ refreshing: true, loading: true, zeroRoles: false });
        fetch('http://roles-events.herokuapp.com/events/')
            .then(res => res.json())
            .then(resJson => {
                // RETIRANDO EVENTOS PASSADOS
                resJson = resJson.filter(role => {
                    const { hasPassed, formatDate } = helpers;
                    if (hasPassed(formatDate(role.eventDate).formatted)) {
                        console.log(
                            role.eventName + ':\t',
                            helpers.formatDate(role.eventDate).formatted,
                            '\tEVENTO PASSADO!'
                        );
                    } else {
                        console.log(
                            role.eventName + ':\t',
                            helpers.formatDate(role.eventDate).formatted,
                            '\tEVENTO FUTURO!'
                        );
                        return role;
                    }
                });

                if (resJson.length === 0) {
                    this.setState({
                        loading: false,
                        roles: resJson,
                        zeroRoles: true
                    });
                } else {
                    this.setState({
                        loading: false,
                        roles: resJson
                    });
                }
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

    render() {
        return (
            <View>
                {this.state.loading && (
                    <View
                        style={{
                            flex: 1,
                            margin: '50%'
                        }}
                    >
                        <ActivityIndicator size="large" color="#00a50b" />
                    </View>
                )}

                {this.state.feedInit == true ? (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._refreshFeed}
                            />
                        }
                    >
                        <View style={styles.refreshBox}>
                            <Text style={styles.refreshBoxText}>
                                <Icon name="refresh" />
                                {'\n'}
                                Puxe para carregar o feed
                            </Text>
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._refreshFeed}
                            />
                        }
                    >
                        {this.state.zeroRoles ? (
                            <View style={styles.notFoundBox}>
                                <Text style={styles.notFoundBoxText}>
                                    <Icon type="Entypo" name="emoji-sad" />
                                    {'\n'}Não foram encontrados rolês.
                                    {'\n'}Tente novamente mais tarde!
                                </Text>
                            </View>
                        ) : (
                            this.state.roles.map((role, index) => (
                                <FeedItem
                                    key={index}
                                    idRole={role.id}
                                    imgRole={role.photo}
                                    nomeRole={role.eventName}
                                    org={role.owner}
                                    eventDate={role.eventDate}
                                    navigation={this.props.navigation}
                                />
                            ))
                        )}
                    </ScrollView>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    refreshBox: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        margin: '50%',
        borderWidth: 1
    },
    refreshBoxText: {
        alignSelf: 'center',
        textAlign: 'center',
        margin: 5,
        color: 'black'
    },
    notFoundBox: {
        height: 100,
        width: 250,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        borderWidth: 1,
        margin: '50%'
    },
    notFoundBoxText: {
        alignSelf: 'center',
        textAlign: 'center',
        margin: 5,
        color: 'black'
    }
});

export default Feed;
