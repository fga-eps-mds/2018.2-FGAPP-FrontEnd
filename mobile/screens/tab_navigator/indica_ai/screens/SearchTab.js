import {StackNavigator} from 'react-navigation';

import LocalDetails from './search_local/LocalDetails';
import SearchScreen from './search_local/SearchScreen';

const SearchTab = StackNavigator({

    Home :{
      screen: SearchScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    LocalDetails : {
      screen: LocalDetails,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default SearchTab;