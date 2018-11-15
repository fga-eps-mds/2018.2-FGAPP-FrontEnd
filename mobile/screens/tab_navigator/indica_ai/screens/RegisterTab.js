import {StackNavigator} from 'react-navigation';
import RegisterScreen from './register_local/RegisterScreen.js';
import RegisterAPIScreen from './register_local/RegisterAPIScreen.js';


const RegisterTab = StackNavigator({

    Register :{
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: 'Cadastrar',
        headerLeft: null,
      },
    },
    RegisterAPI :{
      screen: RegisterAPIScreen,
      navigationOptions: {
        tabBarLabel: 'Novo Local',
        headerLeft: null,
      },
    }
  },
  {
    initialRouteName: 'Register',
    headerMode: 'none',
  }
)

export default RegisterTab;
