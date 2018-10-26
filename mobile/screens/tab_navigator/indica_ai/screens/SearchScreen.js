import {StackNavigator} from 'react-navigation';

import ViewLocal from '../containers/ViewLocal';
import SearchLocal from './search_local/SearchLocal';

const SearchScreen = StackNavigator({

    Home :{
      screen: SearchLocal,
    },
    ViewLocal : {
      screen: ViewLocal,
    }
})

export default SearchScreen;