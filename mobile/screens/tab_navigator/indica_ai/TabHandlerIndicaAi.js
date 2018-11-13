import { TabNavigator } from 'react-navigation';
import SearchTab from './screens/SearchTab';
import RegisterTab from './screens/RegisterTab';
import FavoritesTab from './screens/FavoritesTab';

const TabHandlerIndicaAI = new TabNavigator({

  SearchTab : {
    screen: SearchTab,
    navigationOptions: {
      tabBarLabel: 'Buscar Local',
    }
  },
  RegisterTab : {
    screen: RegisterTab,
    navigationOptions: {
      tabBarLabel: 'Cadastrar',
    }
  },
  FavoritesTab : {
    // Not implemented
    screen: FavoritesTab,
    navigationOptions: {
      tabBarLabel: 'Favoritos',
    }
  }
},
{
    tabBarOptions: {
        showLabel: true,
        showIcon: false,
        labelStyle: {
            fontSize: 12,
        },
        tabStyle: {
            height: 40,
        },
        style: {
            backgroundColor: '#0AACCC',

        },
    },
});

export default TabHandlerIndicaAI;
