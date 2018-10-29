import { TabNavigator, StackNavigator } from 'react-navigation';
import SearchScreen from './screens/SearchScreen.js';
import RegisterLocal from './containers/RegisterLocal.js';
import RegisterLocalAPI from './containers/RegisterLocalAPI.js';

const RegisterStack = StackNavigator({
  Register: {
    screen: RegisterLocal,
    navigationOptions: {
      header: null,
    }
  },
  RegisterAPI: {
    screen: RegisterLocalAPI,
    navigationOptions: {
      header: null,
    }
  }
});

const TabHandlerIndicaAI = new TabNavigator({

  SearchScreen : {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Buscar Local',
    }
  },
  Register : {
    screen: RegisterStack,
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
