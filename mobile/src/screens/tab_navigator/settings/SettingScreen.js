import { createStackNavigator } from 'react-navigation'
import Settings from './settings/Settings'
import UserProfile from './settings/UserProfile'

const SettingScreen = createStackNavigator({
    Settings:{
      screen:Settings,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        headerLeft: null,
      },
    },
    UserProfile:{
      screen: UserProfile,
      navigationOptions: {
        tabBarLabel: 'Perfil',
      },
    },
  },
  { headerMode: 'none' }
);

export default SettingScreen;