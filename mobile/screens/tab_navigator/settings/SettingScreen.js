import { StackNavigator } from 'react-navigation'
import Settings from './settings/Settings'

const SettingScreen = new StackNavigator({
    Settings:{
      screen:Settings,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        headerLeft: null,
      },
    },
  },
  { headerMode: 'none' }
);

export default SettingScreen;