import {StackNavigator} from 'react-navigation';
import RegisterScreen from './register_local/RegisterScreen.js';
import RegisterAPIScreen from './register_local/RegisterAPIScreen.js';


const RegisterTab = StackNavigator({

    Register :{
      screen: RegisterScreen,
    },
    RegisterAPI :{
      screen: RegisterAPIScreen,
    }
  },
  {
    navigationOptions: {
      header: null,
    }
  }
)

export default RegisterTab;
