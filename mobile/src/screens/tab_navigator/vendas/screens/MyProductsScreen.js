import {createStackNavigator} from 'react-navigation'
import CreateProduct from './my_products/CreateProduct'
import MyProducts from './my_products/MyProducts'
import MyProductDetails from './my_products/MyProductDetails'

const MyProductsScreen = createStackNavigator({
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
    MyProductDetails:{
      screen:MyProductDetails,
      navigationOptions: {
        tabBarLabel: 'Editar Produto',
      },
    },
  },
  { headerMode: 'none' }
);

export default MyProductsScreen;
