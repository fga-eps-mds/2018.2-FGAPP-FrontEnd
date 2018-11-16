import { TabNavigator } from 'react-navigation';
import SearchTab from './screens/SearchTab';
import RegisterTab from './screens/RegisterTab';
import FavoritesTab from './screens/FavoritesTab';

const TabHandlerIndicaAI = new TabNavigator({

  SearchTab : {
    screen: SearchTab,
    navigationOptions: {
        tabBarLabel: 'Buscar Local',
        title: 'Buscar Local'
    }
  },
  RegisterTab : {
    screen: RegisterTab,
    navigationOptions: {
      tabBarLabel: 'Cadastrar',
      title: 'Cadastrar'
    }
  },
  FavoritesTab : {
    // Not implemented
    screen: FavoritesTab,
    navigationOptions: {
      tabBarLabel: 'Favoritos',
      title: 'Favoritos'
    }
  }
},
{
    tabBarOptions: {
        showLabel: true,
        showIcon: false,
        activeTintColor: 'black',
        inactiveTintColor: '#5A5A5A',
        labelStyle: {
            fontSize: 12,
        },
        tabStyle: {
            height: 40,
        },
        style: {
            backgroundColor: 'white',
        },
    },
});

export default TabHandlerIndicaAI;
