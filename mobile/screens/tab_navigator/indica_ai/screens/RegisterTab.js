import {StackNavigator} from 'react-navigation';
import RegisterScreen from './register_local/RegisterScreen';

const RegisterTab = StackNavigator({

    Home :{
      screen: RegisterScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    }
})

export default RegisterTab;