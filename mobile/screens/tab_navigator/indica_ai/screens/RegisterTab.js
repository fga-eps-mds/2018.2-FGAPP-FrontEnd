import {StackNavigator} from 'react-navigation';
import RegisterLocal from '../../containers/RegisterLocal.js';
import RegisterLocalAPI from '../../containers/RegisterLocalPI.js';


const RegisterTab = StackNavigator({

    Register :{
      screen: RegisterLocal,
    },
    RegisterAPI :{
      screen: RegisterLocalAPI,
    }
  },
  {
    navigationOptions: {
      header: null,
    }
  }
)

export default RegisterTab;
