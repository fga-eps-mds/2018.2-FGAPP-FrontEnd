import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button,
    Linking
} from 'react-native';

class WelcomeScreen extends Component {

    static navigationOption = {
        header: 'none'
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
        return (
            <View style={styles.container}>
                <Button
                    title='log in'
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                />
                <Button
                    title='Sign Up'
                    onPress={() => this.props.navigation.navigate('SignUpScreen')}
                />
                <Button
                      onPress={this.termsOfUse}
                      title="Termos de Uso"
                />
            </View>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
