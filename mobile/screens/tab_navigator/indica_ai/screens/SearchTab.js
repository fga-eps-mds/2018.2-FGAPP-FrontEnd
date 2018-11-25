import {StackNavigator} from 'react-navigation';

import LocalDetails from './search_local/LocalDetails';
import SearchScreen from './search_local/SearchScreen';

const SearchTab = StackNavigator({

    Home :{
      screen: SearchScreen,
      navigationOptions: {
        tabBarLabel: 'Buscar local',
        headerLeft: null,
      },
    },
    LocalDetails : {
      screen: LocalDetails,
      tabBarLabel: '',
      navigationOptions: {
        tabBarLabel: '',
      },
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
);

export default SearchTab;
