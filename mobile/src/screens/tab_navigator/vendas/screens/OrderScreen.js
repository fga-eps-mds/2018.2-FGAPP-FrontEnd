import {createStackNavigator} from 'react-navigation'
import OrderedProducts from './orders/OrderedProducts'
import OrderDetails from './orders/OrderDetails'

const OrderScreen = createStackNavigator({
  OrderedProducts:{
      screen:OrderedProducts,
      navigationOptions: {
        tabBarLabel: 'OrderedProducts',
        headerLeft: null,
      },
    },
    OrderDetails:{
      screen:OrderDetails,
      navigationOptions: {
        tabBarLabel: 'OrderDetails',
        
      },
    },
  },
  { headerMode: 'none' }
);

export default OrderScreen;
