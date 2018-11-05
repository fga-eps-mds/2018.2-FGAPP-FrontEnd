import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Linking
} from 'react-native';
import {
    Container,
    Button,
    Text,
    Header,
    Title,
    Body,
    Left,
    Right
} from 'native-base';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    static navigationOption = {
        header: 'none'
    }

    async componentWillMount() {
            await Expo.Font.loadAsync({
                    Roboto: require("native-base/Fonts/Roboto.ttf"),
                    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                    Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
            });
            this.setState({ loading: false });
    }


    termsOfUse = () => {
      Linking.canOpenURL('https://github.com/fga-eps-mds/2018.2-FGAPP-FrontEnd/blob/indica-ai-app/195-homologation-environment/mobile/TERMS_OF_USE.md').then(supported => {
        if (supported) {
          Linking.openURL('https://github.com/fga-eps-mds/2018.2-FGAPP-FrontEnd/blob/indica-ai-app/195-homologation-environment/mobile/TERMS_OF_USE.md');
        } else {
          console.log("Don't know how to open TERMS OF USE");
        }
      }); 
    }

    render() {
        if (this.state.loading) {
            return <Expo.AppLoading />;
        } else {
            return (
                <Container>
                    <Header>
                    </Header>
                    <Body style={styles.container}>
                        <View style={styles.initialButtons}>
                            <Button
                                info
                                bordered
                                rounded
                                title='Sign Up'
                                onPress={() => this.props.navigation.navigate('SignUpScreen')}
                            >
                                <Text>Sign up</Text>
                            </Button>
                            <Button
                                info
                                rounded
                                title='log in'
                                onPress={() => this.props.navigation.navigate('LoginScreen')}
                            >
                                <Text>Log in</Text>
                            </Button>
                        </View>
                        <View >
                            <Button
                                  transparent
                                  onPress={this.termsOfUse}
                                  title="Termos de Uso"
                            >
                                <Text>Termos de Uso</Text>
                            </Button>
                        </View>
                    </Body>
                </Container>
            );
        }
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    initialButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
