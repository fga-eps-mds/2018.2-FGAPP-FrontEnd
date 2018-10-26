import {StackNavigator} from 'react-navigation';

import SearchScreen from './screens/SearchScreen.js'
import ViewLocal from './containers/ViewLocal'

const RootStack = StackNavigator({

    Home :{
      screen: SearchScreen,
    },
    ViewLocal : {
      screen: ViewLocal,
    }
})

export default RootStack;