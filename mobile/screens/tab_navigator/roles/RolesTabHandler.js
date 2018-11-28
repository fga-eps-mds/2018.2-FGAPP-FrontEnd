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
			activeTintColor: 'black',
      inactiveTintColor: '#5A5A5A',
			labelStyle: {
				fontSize: 10
      },
      tabStyle: {
        height: 40,
      },
			style: {
				backgroundColor: "white"
			}
		}
	}
);


export default RolesTabHandler;
