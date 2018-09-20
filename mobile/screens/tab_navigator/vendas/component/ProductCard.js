import React, {Component} from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Right} from 'native-base';
import styles from "./styles";

class ProductCard extends Component {
  render(){
    return (
      <Container style = {styles.container}>
        <Content padder>
          <Card style = {styles.mb}>
            <CardItem cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: null,
                  height: 200,
                  flex: 1
                }}/>
            </CardItem>

            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Text>Nome do produto</Text>
              </Left>
              <Right>
                <Text>Preço</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default ProductCard;
