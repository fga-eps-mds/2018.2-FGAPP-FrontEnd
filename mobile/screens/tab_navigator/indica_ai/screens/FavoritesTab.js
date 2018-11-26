import {StackNavigator} from 'react-navigation';

import FavoritesScreen from './favorite_locals/FavoritesScreen';
import FavoriteDetailsScreen from './favorite_locals/FavoriteDetailsScreen';

const FavoritesTab = StackNavigator({
    FavoritesScreen: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarLabel: 'Meus Favoritos',
        headerLeft: null,
      },
    },
    FavoriteDetailsScreen : {
      screen: FavoriteDetailsScreen,
      tabBarLabel: '',
      navigationOptions: {
        tabBarLabel: '',
      },
    },
  },
  {
    initialRouteName: 'FavoritesScreen',
    headerMode: 'none',
  }
);

export default FavoritesTab;
