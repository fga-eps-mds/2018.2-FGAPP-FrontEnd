import {createStackNavigator} from 'react-navigation'
import Offers from './offers/Offers'
import OfferDetails from './offers/OfferDetails'

const OfferScreen = createStackNavigator({
    Offers:{
      screen:Offers,
      navigationOptions: {
        tabBarLabel: 'Ofertas',
        headerLeft: null,
      },
    },
    OfferDetails:{
      screen:OfferDetails,
      navigationOptions: {
        tabBarLabel: 'Detalhes',
      },
    },
  },
  { headerMode: 'none' }
);

export default OfferScreen;
