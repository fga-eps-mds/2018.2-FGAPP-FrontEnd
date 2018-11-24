import React, { Component } from "react";

import { TabNavigator } from "react-navigation";
import CadastroEventos1 from "./screens/TabNavigator/cadastroEventos/CadastroEventos1";
import Events from "./Events";
import EventosPassados from "./screens/TabNavigator/EventosPassados/index";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { Icon } from "native-base";

const RolesTabHandler = TabNavigator(
	{
		Feed: {
			screen: Events,
			navigationOptions: {
				tabBarLabel: "Próximos Rolês",
				title: 'Próximos Rolês',
			}
		},
		EventosPassados: {
			screen: EventosPassados,
			navigationOptions: {
				tabBarLabel: "Rolês passados",
				title: 'Eventos Passados',
			}
		},
		CadastroEventos1: {
			screen: CadastroEventos1,
			navigationOptions: {
				tabBarLabel: "Cadastrar Rolê",
				title: 'Cadastrar Rolê',
			}
		}
	},
	{
		tabBarOptions: {
			showLabel: true,
			activeTintColor: "#1CBD24", // Color of tab when pressed
			inactiveTintColor: "gray", // Color of tab when not pressed
			labelStyle: {
				fontSize: 11
			},
			style: {
				backgroundColor: "white"
			}
		}
	}
);


export default RolesTabHandler;
