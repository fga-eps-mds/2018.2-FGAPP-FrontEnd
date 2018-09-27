import {StackNavigator} from 'react-navigation'
import CreateProduct from './my_products/CreateProduct'
import MyProducts from './my_products/MyProducts'

const MyProductsScreen = new StackNavigator({
    MyProducts:{
      screen:MyProducts,
      navigationOptions: {
        tabBarLabel: 'Meus Produtos',
        headerLeft: null,
      },
    },
    CreateProduct:{
      screen:CreateProduct,
      navigationOptions: {
        tabBarLabel: 'Criar Produto',
      },
    },
  },
  { headerMode: 'none' }
);

export default MyProductsScreen;
