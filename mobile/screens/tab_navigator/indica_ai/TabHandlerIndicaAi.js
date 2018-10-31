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
            fontSize: 10,
        },
        tabStyle: {
            height: 40,
        },
        style: {
            backgroundColor: '#5A5A5A',

        },
    },
});

export default TabHandlerIndicaAI;
