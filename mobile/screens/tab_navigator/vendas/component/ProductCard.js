import React, {Component} from 'react';
import { Image } from 'react-native';
import { Icon, Card, CardItem, Text, Left, Right} from 'native-base';
import styles from "./styles";

class ProductCard extends Component {
  render(){
    return (
      <Card style = {styles.main}>
        <CardItem cardBody>
          <Image
            style={
              styles.imageItems
            }
            source={this.props.productImage}/>
        </CardItem>

        <CardItem style={styles.items}>
          <Left>
            <Text>{this.props.productName}</Text>
          </Left>
          <Right>
            <Icon name="md-cash"/>
            <Text>{this.props.productPrice}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default ProductCard;
