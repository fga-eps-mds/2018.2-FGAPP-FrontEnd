import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    BackHandler
} from 'react-native';
import styles from '../../styles'
import { Button } from 'native-base';
import {getUserToken} from '../../../../../AuthMethods'


class OrderDetails extends Component {

    constructor(props) {
      super(props);
      this.state = {
        photo: 'https://res.cloudinary.com/integraappfga/image/upload/v1543023378/WHITE_BACKGROUND.jpg',
        seller: 'Usuário sem nome',
        token: undefined,
        request: '0',
      };
    }

    componentDidMount(){
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;

      getUserToken()
      .then(res =>{ 
        this.setState({ token: res });
        this.loadProduct(order);
        this.loadUser(order);
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);  
      })
    }

    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    _cancelButton = async () => {
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;
      const set_order_status_path = `${process.env.VENDAS_API}/api/set_order_status/`;

      fetch(set_order_status_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'order_id': order.id,
          'new_status': '2',
          'token': this.state.token,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if(responseJson.error != undefined)
          Alert.alert(responseJson.error)

        else
          Alert.alert('Operação realizada com sucesso.')
          this.props.navigation.navigate('OrderedProducts', {token:this.state.token})
      })
      .catch((err) => {
        console.error(err)
      })
    }
    
    _closeButton = async () => {
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;
      const set_order_status_path = `${process.env.VENDAS_API}/api/set_order_status/`;

      fetch(set_order_status_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'order_id': order.id,
          'new_status': '1',
          'token': this.state.token,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if(responseJson.error != undefined)
          Alert.alert(responseJson.error)

        else
          Alert.alert('Operação realizada com sucesso.')
          this.props.navigation.navigate('OrderedProducts', {token:this.state.token})
      })
      .catch((err) => {
        console.error(err)
      })
    }

    _buttonRequest() {
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;
      const set_order_status_path = `${process.env.VENDAS_API}/api/set_order_status/`;

      fetch(set_order_status_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'order_id': order.id,
          'new_status': this.state.request,
          'token': this.state.token,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if(responseJson.error != undefined)
          Alert.alert(responseJson.error)

        else
          Alert.alert('Operação realizada com sucesso.')
          this.props.navigation.navigate('OrderedProducts', {token:this.state.token})
      })
      .catch((err) => {
        console.error(err)
      })
    }

    _goBack= async () => {
      this.props.navigation.navigate('OrderedProducts', {token:this.state.token});
    }

    loadUser(order){
      const get_user_path = `${process.env.VENDAS_API}/api/get_name/`;

  		fetch(get_user_path, {
  			method: 'POST',
  			headers: {
  			'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
  				'token': this.state.token,
        	'user_id': order.fk_buyer,
  			}),
  		})
  			.then((response) => { return response.json() })
  			.then((responseJson) => {
          if(responseJson.name){
            seller = responseJson.name;
            this.setState({ seller: seller });
          }
  			})
  			.catch((error) => {
  				console.error(error);
        });
    }

    loadProduct(order){
      const get_product_path = `${process.env.VENDAS_API}/api/get_product/`;

  		fetch(get_product_path, {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
  				'token': this.state.token,
          'product_id': order.fk_product,
  			}),
  		})
  			.then((response) => { return response.json() })
  			.then((responseJson) => {
          if(responseJson.photo) {
            photo = responseJson.photo;
            this.setState({ photo: photo });
          }
  			})
  			.catch((error) => {
  				console.error(error);
        });
    }

    render() {
      const {state} = this.props.navigation;
      var order = state.params ? state.params.order : undefined;

        return (
          <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.details_main}>
              <Image
                style={styles.image }
                source={{ uri: this.state.photo }}
              >
              </Image>
              <View style={{ flexDirection: 'row', paddingLeft: 10}}>
                <View style={{flexDirection: 'column', width: '70%',}}>
                  <Text style={{fontSize: 25}}>{order.product_name}</Text>
                  <Text style={{fontSize: 20}}>R$ {parseFloat(order.total_price).toFixed(2)}</Text>
                </View>
                <View style={{flexDirection: 'column', width: '30%'}}>
                  <Text style={{fontSize: 12}}>Quantidade</Text>
                  <Text style={{fontSize: 16}}>{order.quantity}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                <Text style={{fontSize: 20}}>Cliente: {this.state.seller}</Text>
                <View style={{height: 10}}/>
                <Text style={{fontSize: 16, color: '#5A5A5A'}}>{order.buyer_message}</Text>
                <View style={{height: 50}}/>
              </View>
              <View style={local_styles.buttonContainer}>
                <Button
                  onPress={this._cancelButton}
                  style={local_styles.button}
                  backgroundColor = "#830037"
                >
                  <Text style={{color: 'white'}}> CANCELAR </Text>
                  <Text style={{color: 'white'}}> PEDIDO </Text>
                </Button>
                <Button
                  onPress={this._closeButton}
                  style={local_styles.button}
                  success
                >
                  <Text style={{color: 'white'}}>ATENDIDO</Text>
                </Button>
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
