import React, { Component } from "react";

import { TabNavigator } from "react-navigation";
import CadastroEventos1 from "./screens/TabNavigator/cadastroEventos/CadastroEventos1";
import Events from "./Events";
import EventosPassados from "./screens/TabNavigator/EventosPassados/index";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { Icon } from "native-base";

const RolesTabStackNavigator = TabNavigator(
	{
		Feed: {
			screen: Events,
			navigationOptions: {
				tabBarLabel: "Próximos Rolês"
				//tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='newspaper' size={27} style={{ color: tintColor }} />
			}
		},
		EventosPassados: {
			screen: EventosPassados,
			navigationOptions: {
				tabBarLabel: "Rolês passados"
				//tabBarIcon: ({tintColor}) => <Icon type='MaterialCommunityIcons' name='history' style={{fontSize:27, color: tintColor}} />
			}
		},
		CadastroEventos1: {
			screen: CadastroEventos1,
			navigationOptions: {
				tabBarLabel: "Cadastrar Rolê"
				//tabBarIcon: ({ tintColor }) => <MaterialIcons name='playlist-add' size={27} style={{ color: tintColor }} />
			}
		}
	},
	{
		headerMode: "none", // I don't want a NavBar at top
		// tabBarPosition: 'bottom',                   // So your Android tabs go bottom
		tabBarOptions: {
			activeTintColor: "#1CBD24", // Color of tab when pressed
			inactiveTintColor: "gray", // Color of tab when not pressed
			//showIcon: 'true',                         // Shows an icon for both iOS and Android
			//showLabel: (Platform.OS !== 'android'),   // No label for Android
			labelStyle: {
				fontSize: 11
			},
			style: {
				backgroundColor: "white" // Makes Android tab bar white instead of standard blue
			}
		}
	}
);

class RolesTabHandler extends Component {
	render() {
		return <RolesTabStackNavigator />;
	}
}
export default RolesTabHandler;
