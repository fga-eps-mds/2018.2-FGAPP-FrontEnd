import { TabNavigator } from 'react-navigation';
import SearchScreen from './screens/SearchScreen.js';
import RegisterTab from './screens/RegisterTab.js';

const TabHandlerIndicaAI = new TabNavigator({

  SearchScreen : {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Buscar Local',
    }
  },
  RegisterTab : {
    screen: RegisterTab,
    navigationOptions: {
      tabBarLabel: 'Cadastrar',
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
