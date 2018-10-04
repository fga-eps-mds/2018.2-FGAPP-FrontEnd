import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  TimePickerAndroid,
  DatePickerAndroid
} from "react-native";
import {
  Foundation,
} from "@expo/vector-icons";

// import Feed from '../feed/Feed'
import Input from './components/Input'
import Title from './components/Title'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
      foods: "",
    };
  }

  imprimeRole() {
    this.props.navigation.navigate("Feed");
  }

  async datePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        console.log(year)
        console.log(month)
        console.log(day)
        this.setState({
          eventDate: `${day}/${month + 1}/${year}`
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  async timePicker() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: true, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        console.log(hour)
        console.log(minute)
        this.setState({
          eventHour: `${hour}:${minute}:00`
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  cadastrarRole = async () => {

    let blocked = false;

    if(this.state.event_name == '') {
      alert("Campo de nome do evento inválido!");
    } else if(this.state.eventDescription == '') {
      alert("Campo de descrição do evento inválido!");
    } else if(this.state.linkReference == '') {
      alert("Campo de link de referência do evento inválido!");
    } else if(this.state.organizer == '') {
      alert("Campo de organizer do evento inválido!");
    } else if(this.state.organizerTel == '') {
      alert("Campo de organizerTel do evento inválido!");
    } else if(this.state.value == '') {
      alert("Campo de value do evento inválido!");
    } else if(this.state.address == '') {
      alert("Campo de address do evento inválido!");
    } else if(this.state.linkAddres == '') {
      alert("Campo de linkAddres do evento inválido!");
    } else if(this.state.eventDate == '') {
      alert("Campo de eventDate do evento inválido!");
    } else if(this.state.eventHour == '') {
      alert("Campo de eventHour do evento inválido!");
    } else if(this.state.adultOnly == '') {
      alert("Campo de adultOnly do evento inválido!");
    } else if(this.state.drinks == '') {
      alert("Campo de drinks do evento inválido!");
    } else if(this.state.foods == '') {
      alert("Campo de foods do evento inválido!");
    }

    console.log(blocked)

    if(blocked) {
      alert("Cadastro inválido, informações incompletas")
      return;
    }

    fetch("http://henriqueteste.pythonanywhere.com/events/?format=json", {
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
        linkAddress: this.state.linkAddres,
        eventDate: this.state.eventDate,
        eventHour: this.state.eventHour,
        adultOnly: this.state.adultOnly,
        foods: this.state.foods,
        drinks: this.state.drinks
      })
    })
      .then(response => response.json())
      .then(responseJson => {

        //Verifica se o cadastro foi bem sucedido
        console.log(responseJson);
        
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
              onChangeText={event_name => this.setState({ event_name })}
            />

            <Input 
              iconName="description" 
              placeholder="Descrição" 
              onChangeText={eventDescription => this.setState({ eventDescription })}
            />

            <Input 
              iconName="insert-link" 
              placeholder="Link de Referência" 
              onChangeText={linkReference => this.setState({ linkReference })}

              />

          <Input 
              iconName="person" 
              placeholder="Nome para Contato" 
              onChangeText={organizer => this.setState({ organizer })}
              
            />          

            <Input 
              iconName="phone" 
              placeholder="Telefone para Contato" 
              onChangeText={organizerTel => this.setState({ organizerTel })}
              keyboardType = "numeric"
              />          

            <Input 
              iconName="attach-money" 
              placeholder="Valor do Ingresso"
              onChangeText={value => this.setState({ value })}
              keyboardType="numeric"
              />  

            <Input 
              iconName="place" 
              placeholder="Local" 
              onChangeText={address => this.setState({ address })}
              />  

            <Input 
              iconType = "MaterialCommunityIcons"
              iconName="google-maps" 
              placeholder="Link Localização Google Maps" 
              onChangeText={linkAddress => this.setState({ linkAddress })}
              />  

            <View style={{flexDirection:"row", justifyContent: 'center'}}>

              <View>
                
                <TouchableOpacity style={styles.time}
                onPress={() => this.datePicker()}>
                <MaterialIcons
                  style={styles.icon} name={'today'} size={26}
                />
                <Text>
                  {this.state.eventDate || 'Data'}
                </Text>

                </TouchableOpacity>

              
              </View>


              <View>
                
                <TouchableOpacity style={styles.time}
                onPress={() => this.timePicker()}>
                <MaterialIcons
                  style={styles.icon} name={'access-time'} size={26}
                />
                <Text>
                  {this.state.eventHour || 'Horário'}
                </Text>

                </TouchableOpacity>

              
              </View>
                
            </View>

            <Input 
              iconType = "Entypo"
              iconName="drink" 
              placeholder="Bebidas" 
              onChangeText={drinks => this.setState({ drinks })}
              />

            <Input 
              iconType = "MaterialCommunityIcons"
              iconName="food-fork-drink" 
              placeholder="Comidas" 
              onChangeText={foods => this.setState({ foods })}
              />  

            <View style={styles.inputContainerSwitch}>
              <Foundation style={styles.icon} name="prohibited" size={30} />
              <Switch
                style={styles.switch}
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
  },
  icon: {
    padding: 5,
    alignContent: "center",
    alignItems: "center"
  },
  time: {
    borderBottomWidth: 1,
    //marginLeft: 10,
    //marginRight: 10,
    minWidth: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
