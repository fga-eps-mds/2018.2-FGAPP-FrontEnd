import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  Entypo
} from "@expo/vector-icons";

import Feed from '../feed/Feed'

export default class CadastroEventos1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
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
    var register_role = `http://5bae6667a65be00014676441.mockapi.io/`;
    fetch("http://5bae6667a65be00014676441.mockapi.io/event", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: this.state.eventName,
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
        if (responseJson.eventName == "") {
          this.setState({ eventName_field_alerts: responseJson.eventName });
          this.setState({ eventName_field_is_bad: true });
        } else {
          this.setState({ eventName_field_alerts: [""] });
          this.setState({ eventName_field_is_bad: false });
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
        <ScrollView
          style={styles.scroll}
        >
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Cadastrar novo rolê</Text>
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="title" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Nome do Rolê"
              returnKeyType="next"
              placeholderTextColor="gray"
              onChangeText={eventName => this.setState({ eventName })}
              badInput={this.state.eventName_field_is_bad}
              fieldAlert={this.state.eventName_field_alerts}
              keyExtractor={"eventName"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="description" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={eventDescription =>
                this.setState({ eventDescription })
              }
              badInput={this.state.eventDescription_field_is_bad}
              fieldAlert={this.state.eventDescription_field_alerts}
              keyExtractor={"eventDescription"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="insert-link" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Link de Referência"
              placeholderTextColor="gray"
              onChangeText={linkReference => this.setState({ linkReference })}
              badInput={this.state.linkReference_field_is_bad}
              fieldAlert={this.state.linkReference_field_alerts}
              keyExtractor={"linkReference"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="person" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Nome para contato"
              placeholderTextColor="gray"
              onChangeText={organizer => this.setState({ organizer })}
              badInput={this.state.organizer_field_is_bad}
              fieldAlert={this.state.organizer_field_alerts}
              keyExtractor={"organizer"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="phone" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              keyboardType="phone-pad"
              placeholderTextColor="gray"
              onChangeText={organizerTel => this.setState({ organizerTel })}
              badInput={this.state.organizerTel_field_is_bad}
              fieldAlert={this.state.organizerTel_field_alerts}
              keyExtractor={"organizerTel"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="attach-money" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Valor do ingresso"
              placeholderTextColor="gray"
              keyboardType="numeric"
              onChangeText={value => this.setState({ value })}
              badInput={this.state.value_field_is_bad}
              fieldAlert={this.state.value_field_alerts}
              keyExtractor={"value"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="place" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Local"
              returnKeyType="next"
              placeholderTextColor="gray"
              onChangeText={address => this.setState({ address })}
              badInput={this.state.address_field_is_bad}
              fieldAlert={this.state.address_field_alerts}
              keyExtractor={"address"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="google-maps"
              size={26}
            />
            <TextInput
              style={styles.input}
              placeholder="Link localização Google Maps"
              placeholderTextColor="gray"
              onChangeText={linkAddress => this.setState({ linkAddress })}
              badInput={this.state.linkAddress_field_is_bad}
              fieldAlert={this.state.linkAddress_field_alerts}
              keyExtractor={"linkAddress"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="today" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Data"
              placeholderTextColor="gray"
              onChangeText={eventDate => this.setState({ eventDate })}
              badInput={this.state.eventDate_field_is_bad}
              fieldAlert={this.state.eventDate_field_alerts}
              keyExtractor={"eventDate"}
            />

            <MaterialIcons style={styles.icon} name="access-time" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Horário de início"
              placeholderTextColor="gray"
              onChangeText={eventHour => this.setState({ eventHour })}
              badInput={this.state.eventHour_field_is_bad}
              fieldAlert={this.state.eventHour_field_alerts}
              keyExtractor={"eventHour"}
            />
          </View>

          <View style={styles.inputContainer}>
            <Entypo style={styles.icon} name="drink" size={26} />
            <TextInput
              style={styles.input}
              placeholder="Drinks"
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={drinks => this.setState({ drinks })}
              badInput={this.state.drinks_field_is_bad}
              fieldAlert={this.state.drinks_field_alerts}
              keyExtractor={"drinks"}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="food-fork-drink"
              size={26}
            />

            <TextInput
              style={styles.input}
              placeholder="Comidas"
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={foods => this.setState({ foods })}
              badInput={this.state.foods_field_is_bad}
              fieldAlert={this.state.foods_field_alerts}
              keyExtractor={"foods"}
            />
          </View>

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
  titleContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  titleText: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    textAlign: "center"
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
  icon: {
    padding: 5
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
  scroll: {
    alignContent: "center"
  },
  switch: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff"
  },
  icon: {
    padding: 5,
    alignContent: "center",
    alignItems: "center"
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
