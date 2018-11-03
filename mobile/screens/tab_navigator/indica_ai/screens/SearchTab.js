import {StackNavigator} from 'react-navigation';

import LocalDetails from './search_local/LocalDetails';
import SearchScreen from './search_local/SearchScreen';

const SearchTab = StackNavigator({

    Home :{
      screen: SearchScreen,
    },
    LocalDetails : {
      screen: LocalDetails,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
    }
  }
);

export default SearchTab;