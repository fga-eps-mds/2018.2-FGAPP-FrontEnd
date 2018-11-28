import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import Geral from './components/Geral';
import Detalhes from './components/Detalhes';
import Localizacao from './components/Localizacao';
import Contato from './components/Contato';

class Profile extends Component {
<<<<<<< HEAD
	state = {
		loading: true,
		role: ""
	};

	_getDadosRole = () => {
		const { idRole } = this.props.navigation.state.params;
		const eventPath = `${process.env.ROLES_EVENTS_API}/events/`;
		fetch(eventPath + idRole)
			.then(res => res.json())
			.then(resJson => {
				this.setState({ loading: false, role: resJson });
			})
			.catch(error => {
				this.setState({
					loading: false
				});
				console.error(error);
			});
	};
=======
    state = {
        loading: true,
        role: ''
    };
>>>>>>> 4b5e00d150982727190611843984e56a0e413f9c

    _getDadosRole = () => {
        const { idRole } = this.props.navigation.state.params;
        const eventPath = `${process.env.ROLES_EVENTS_API}/events/`;
        fetch(eventPath + idRole)
            .then(res => res.json())
            .then(resJson => {
                if(resJson.eventDescription == null) resJson.eventDescription = ""
                if(resJson.drinks == null) resJson.drinks = ""
                if(resJson.foods == null) resJson.foods = ""
                this.setState({ loading: false, role: resJson });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                console.error(error);
            });
    };

    componentDidMount() {
        this._getDadosRole();
    }

    render() {
        const { role } = this.state;
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
            <ScrollView>
                <Geral
                    photo={role.photo}
                    eventName={role.eventName}
                    eventHour={role.eventHour}
                    eventDate={role.eventDate}
                    value={role.value}
                    adultOnly={role.adultOnly}
                    eventDescription={role.eventDescription.length > 0 ? role.eventDescription: null }
                />

                {(role.latitude != 0 && role.longitude) != 0 && (
                    <Localizacao
                        placeName={role.address}
                        latitude={role.latitude}
                        longitude={role.longitude}
                        latitudeDelta={role.latitudeDelta}
                        longitudeDelta={role.longitudeDelta}
                    />
                )}

                {(  role.drinks.length > 0 ||
                    role.foods.length > 0) && (
                        <Detalhes
                            drinks={role.drinks}
                            foods={role.foods}
                            refURL={this.state.role.linkReference}
                        />
                    )
                }

                <Contato
                    organizer={role.organizer}
                    organizerTel={role.organizerTel}
                />
            </ScrollView>
        );
    }
}

export default Profile;
