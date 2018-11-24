import { StackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import TabHandler from './screens/TabHandler';
import { StatusBar, Platform } from 'react-native';

const SignedOutRoutes = new StackNavigator({
    LoginScreen:{
        screen:LoginScreen,
        navigationOptions: ({ navigation }) => ({
        header: null,

        }),
    },
    SignUpScreen:{
        screen:SignUpScreen,
        navigationOptions: {
            headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
            headerTintColor: 'white',
        }
    },
});
  
const SignedInRoutes = new StackNavigator({
    TabHandler:{
         screen:TabHandler,
        // navigationOptions: ({ navigation }) => ({
        //     header: null,
        // }),
    },
});

export const RootNavigator = (signedIn = false) => {
    return new StackNavigator({
        SignedIn: { screen: SignedInRoutes },
        SignedOut: { screen: SignedOutRoutes }
    },
    {
        headerMode: "none",
        mode: "modal",
        initialRouteName: signedIn ? "SignedIn" : "SignedOut",
        navigationOptions: {
            gesturesEnabled: false,
        },
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
          }
    });
};