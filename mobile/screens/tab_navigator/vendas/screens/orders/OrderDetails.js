import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    CardItem,
    Button,
    Alert,
    ImageBackground,
} from 'react-native';
import styles from '../../components/styles'
import jwt_decode from 'jwt-decode'
import { LinearGradient } from 'expo';

//TELA PROVISÓRIA PARA TESTES
class OrderDetails extends Component {
    _onPressButton = async () => {
      Alert.alert("O botao foi apertado ");
    }

    render() {
      const {state} = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      var order = state.params ? state.params.order : undefined;
      var user = jwt_decode(token);

        return (
          <ScrollView>
            <View style={styles.details_main}>
              <ImageBackground
                style={styles.image }
                source={{ uri: 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/06/22/alfajor-caseiro-como-fazer.jpg' }}
              >
                <LinearGradient
                  colors={['transparent', 'black']}
                  locations={[0.982, 0.90]}
                  style={styles.gradient}
                />
              </ImageBackground>
              <View style={{ flexDirection: 'row', paddingBottom: 20, paddingLeft: 10}}>
                <View style={{flexDirection: 'column', width: '70%',}}>
                  <Text style={{fontSize: 25}}>'Cupcake'</Text>
                  <Text style={{fontSize: 20}}>R$ {order.total_price.toFixed(2)}</Text>
                </View>
                <View style={{flexDirection: 'column', width: '30%'}}>
                  <Text style={{fontSize: 16}}>Quantidade</Text>
                  <Text style={{fontSize: 16}}>{order.quantity}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                <Text style={{fontSize: 20}}>Cliente: {user.user_id}</Text>
                <View style={{height: 10}}/>
                <Text style={{fontSize: 16}}>{order.buyer_message}</Text>
                <View style={{height: 50}}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%'}}/>
                <Button
                  color="#0EAC6F"
                  title="Atendido"
                  onPress={this._onPressButton}
                />
              </View>
            </View>
          </ScrollView>
        );
    }
}
export default OrderDetails;

const styless = StyleSheet.create({
    container: {
        flex: 1,
        //width: '100%',
    }
});
