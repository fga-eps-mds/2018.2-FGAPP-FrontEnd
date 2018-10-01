import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import {
  Foundation,
} from "@expo/vector-icons";

// import Feed from '../feed/Feed'
import Input from './components/Input'
import Title from './components/Title'

export default class CadastroEventos1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: "",
      eventDescription: "",
      linkReference: "",
      organizer: "",
      organizerTel: "",
      value: "",
      address: "",
      linkAddres: "",
      eventDate: "",
      eventHour: "",
      adultOnly: false,
      drinks: "",
      foods: ""
    };
  }

  imprimeRole() {
    this.props.navigation.navigate("Feed");
  }

  cadastrarRole = async () => {
    var register_role = `https://raulvictor.pythonanywhere.com/`;
    fetch("https://raulvictor.pythonanywhere.com/events/?format=json", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_name: this.state.event_name,
        eventDescription: this.state.eventDescription,
        linkReference: this.state.linkReference,
        organizer: this.state.organizer,
        organizerTel: this.state.organizerTel,
        value: this.state.value,
        address: this.state.address,
        linkAddres: this.state.linkAddres,
        eventDate: this.state.eventDate,
        eventHour: this.state.eventHour,
        adultOnly: this.state.adultOnly,
        foods: this.state.foods,
        drinks: this.state.drinks
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        //Campo de event
        if (responseJson.event_name == "") {
          this.setState({ event_name_field_alerts: responseJson.event_name });
          this.setState({ event_name_field_is_bad: true });
        } else {
          this.setState({ event_name_field_alerts: [""] });
          this.setState({ event_name_field_is_bad: false });
        }
        //Campo de eventDescription
        if (responseJson.eventDescription == "") {
          this.setState({
            eventDescription_field_alerts: responseJson.eventDescription
          });
          this.setState({ eventDescription_field_is_bad: true });
        } else {
          this.setState({ eventDescription_field_alerts: [""] });
          this.setState({ eventDescription_field_is_bad: false });
        }
        //Campo de linkReference
        if (responseJson.linkReference != undefined) {
          this.setState({
            linkReference_field_alerts: responseJson.linkReference
          });
          this.setState({ linkReference_field_is_bad: true });
        } else {
          this.setState({ linkReference_field_alerts: [""] });
          this.setState({ linkReference_field_is_bad: false });
        }
        //Campo de organizer
        if (responseJson.organizer != undefined) {
          this.setState({ organizer_field_alerts: responseJson.organizer });
          this.setState({ organizer_field_is_bad: true });
        } else {
          this.setState({ organizer_field_alerts: [""] });
          this.setState({ organizer_field_is_bad: false });
        }
        //Campo de value
        if (responseJson.value != undefined) {
          this.setState({ value_field_alerts: responseJson.value });
          this.setState({ value_field_is_bad: true });
        } else {
          this.setState({ value_field_alerts: [""] });
          this.setState({ value_field_is_bad: false });
        }
        //Campo de address
        if (responseJson.address != undefined) {
          this.setState({ address_field_alerts: responseJson.address });
          this.setState({ address_field_is_bad: true });
        } else {
          this.setState({ address_field_alerts: [""] });
          this.setState({ address_field_is_bad: false });
        }
        //Campo de linkAddress
        if (responseJson.linkAddress != undefined) {
          this.setState({ linkAddress_field_alerts: responseJson.linkAddress });
          this.setState({ linkAddress_field_is_bad: true });
        } else {
          this.setState({ linkAddress_field_alerts: [""] });
          this.setState({ linkAddress_field_is_bad: false });
        }
        //Campo de eventDate
        if (responseJson.eventDate != undefined) {
          this.setState({ eventDate_field_alerts: responseJson.eventDate });
          this.setState({ eventDate_field_is_bad: true });
        } else {
          this.setState({ eventDate_field_alerts: [""] });
          this.setState({ eventDate_field_is_bad: false });
        }
        //Campo de eventHour
        if (responseJson.eventHour != undefined) {
          this.setState({ eventHour_field_alerts: responseJson.eventHour });
          this.setState({ eventHour_field_is_bad: true });
        } else {
          this.setState({ eventHour_field_alerts: [""] });
          this.setState({ eventHour_field_is_bad: false });
        }
        //Campo de adultOnly
        if (responseJson.adultOnly != undefined) {
          this.setState({ adultOnly_field_alerts: responseJson.adultOnly });
          this.setState({ adultOnly_field_is_bad: true });
        } else {
          this.setState({ adultOnly_field_alerts: [""] });
          this.setState({ adultOnly_field_is_bad: false });
        }
        //Campo de foods
        if (responseJson.foods != undefined) {
          this.setState({ foods_field_alerts: responseJson.foods });
          this.setState({ foods_field_is_bad: true });
        } else {
          this.setState({ foods_field_alerts: [""] });
          this.setState({ foods_field_is_bad: false });
        }
        //Campo de drinks
        if (responseJson.drinks != undefined) {
          this.setState({ drinks_field_alerts: responseJson.drinks });
          this.setState({ drinks_field_is_bad: true });
        } else {
          this.setState({ drinks_field_alerts: [""] });
          this.setState({ drinks_field_is_bad: false });
        }
        //Sem campo
        if (responseJson.non_field_errors != undefined) {
          this.setState({ non_field_alert: responseJson.non_field_errors });
        } else {
          this.setState({ non_field_alert: [""] });
        }
        //Sucesso
        if ((responseJson = !undefined)) {
          console.log(responseJson);
          Alert.alert(
            "Rolê criado com sucesso!",
            "Seu rolê foi cadastrado com sucesso!\n" + "Boa sorte!",
            [
              {
                text: "OK"
              }
            ],
            {
              cancelable: false
            }
          );
          this.props.navigation.navigate("Feed");
        }
      })
      .catch(err => {
        if (typeof err.text === "function") {
          err.text().then(errorMessage => {
            alert(errorMessage);
            console.log(errorMessage);
          });
        } else {
          Alert.alert("Erro na conexão.");
          console.log(err);

        }
      });
  };

  render() {
    return (

      <ScrollView style={{alignContent: "center"}}>
        <View style={styles.container}>
            <Title titleText="Cadastro de Novo Role"/>
            <Input 
              iconName="title" 
              placeholder="Nome do Rolê" 
              onChangeText={eventName => this.setState({ eventName })}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
              keyExtractor={"eventName"}
            />

            <Input 
              iconName="description" 
              placeholder="Descrição" 
              onChangeText={eventDescription => this.setState({ eventDescription })}
              keyExtractor={"eventDescription"}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />

            <Input 
              iconName="insert-link" 
              placeholder="Link de Referência" 
              onChangeText={linkReference => this.setState({ linkReference })}
              keyExtractor={"linkReference"}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />

          <Input 
              iconName="person" 
              placeholder="Nome para Contato" 
              onChangeText={organizer => this.setState({ organizer })}
              keyExtractor={"organizer"}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />          

            <Input 
              iconName="phone" 
              placeholder="Telefone para Contato" 
              onChangeText={organizerTel => this.setState({ organizerTel })}
              keyExtractor={"organizerTel"}
              keyboardType = "numeric"
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />          

            <Input 
              iconName="attach-money" 
              placeholder="Valor do Ingresso"
              onChangeText={value => this.setState({ value })}
              keyExtractor={"value"}
              keyboardType="numeric"
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />  

            <Input 
              iconName="place" 
              placeholder="Local" 
              onChangeText={address => this.setState({ address })}
              keyExtractor={"address"}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />  

            <Input 
              iconType = "MaterialCommunityIcons"
              iconName="google-maps" 
              placeholder="Link Localização Google Maps" 
              onChangeText={linkAddress => this.setState({ linkAddress })}
              keyExtractor={"linkAdress"}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />  

            <View style={{flexDirection:"row"}}>
              <Input 
                iconName="today" 
                placeholder="Data" 
                onChangeText={eventDate => this.setState({ eventDate })}
                keyExtractor={"eventDate"}
                badInput={this.state.eventName_field_alerts}
                fieldAlert={this.state.eventName_field_is_bad}
              />  
              <Input 
                iconName="access-time" 
                placeholder="Horário de Início" 
                onChangeText={eventHour => this.setState({ eventHour })}
                keyExtractor={"eventHour"}
                badInput={this.state.eventName_field_alerts}
                fieldAlert={this.state.eventName_field_is_bad}
              />  
            </View>

            <Input 
              iconType = "Entypo"
              iconName="drink" 
              placeholder="Bebidas" 
              onChangeText={drinks => this.setState({ drinks })}
              keyExtractor={"drinks"}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />

            <Input 
              iconType = "MaterialCommunityIcons"
              iconName="food-fork-drink" 
              placeholder="Comidas" 
              onChangeText={foods => this.setState({ foods })}
              keyExtractor={"food"}
              badInput={this.state.eventName_field_alerts}
              fieldAlert={this.state.eventName_field_is_bad}
            />  

            <View style={styles.inputContainerSwitch}>
              <Foundation style={styles.icon} name="prohibited" size={30} />
              <Switch
                style={styles.switch}
                fieldAlert={this.state.adultOnly_field_alerts}
                keyExtractor={"adultOnly"}
                value={this.state.adultOnly}
                onValueChange={(adultOnly) => {this.setState({ adultOnly })}}
              />
            </View>

            <View style={styles.submitButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.cadastrarRole()}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          
          
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  button: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 350,
    borderRadius: 30,
    backgroundColor: "limegreen"
  },
  submitButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  inputTime: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "limegreen",
    width: 150,
    marginBottom: 10
  },
  image: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "limegreen"
  },
  switch: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff"
  },
  inputContainerSwitch: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingRight: 150,
    paddingLeft: 140
  }
});
