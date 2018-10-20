import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    CardItem,
    Alert,
    ImageBackground,
} from 'react-native';
import styles from '../../components/styles'
import jwt_decode from 'jwt-decode'
import { LinearGradient } from 'expo';
import { Button } from 'native-base';

//TELA PROVISÓRIA PARA TESTES
class OrderDetails extends Component {

    constructor(props) {
      super(props);
      this.state = {
        request: 0,
      };
    }
    _cancelButton = async () => {
      this.setState({ request:2 })
      this._buttonRequest()
    }

    _closeButton = async () => {
      this.setState({ request: 1 })
      this._buttonRequest()
    }

    _buttonRequest() {
      Alert.alert('Funcionou');
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
                  <Text style={{fontSize: 20}}>R$ {parseFloat(order.total_price).toFixed(2)}</Text>
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
              <View>
                <View style={local_styles.buttonContainer}>
                <Button
                  danger
                  onPress={this._cancelButton}
                  style={local_styles.button}
                >
                <Text style={{color: 'white'}}> CANCELAR </Text>
                <Text style={{color: 'white'}}> PEDIDO </Text>
                </Button>

                <Button
                  success
                  onPress={this._closeButton}
                  style={local_styles.button}
                >
                <Text style={{color: 'white'}}> ATENDIDO </Text>
                </Button>

                </View>
              </View>
            </View>
          </ScrollView>
        );
    }
}
export default OrderDetails;

const local_styles = StyleSheet.create({
    container: {
        flex: 1
    },
    description: {
      flex: 1,
      height: '35%',
      width: '95%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 10,
    },
    button: {
      justifyContent: 'center',
      flexDirection: 'column',
      height: 40,
      width: 100,
    }
});
