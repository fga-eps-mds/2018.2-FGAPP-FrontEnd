import {StackNavigator} from 'react-navigation';
import FavoritesScreen from './favorite_locals/FavoritesScreen';

const FavoritesTab = StackNavigator({
  FavoritesScreen: {
    screen: FavoritesScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  }
})

export default FavoritesTab;