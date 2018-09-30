import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  Entypo
} from "@expo/vector-icons";

const Input = (props) => {
    return (
      <View style={styles.inputContainer}>
        {props.iconType == "MaterialIcons" || props.iconType == null && <MaterialIcons style={styles.icon} name={props.iconName} size={26} />}
        {props.iconType == "Entypo" && <Entypo style={styles.icon} name={props.iconName} size={26} />}
        {props.iconType == "MaterialCommunityIcons" && <MaterialCommunityIcons style={styles.icon} name={props.iconName} size={26}/>}
        
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          returnKeyType="next"
          placeholderTextColor="gray"

          keyboardType={props.keyboardType ? props.keyboardType : "default"}

          onChangeText={props.onChangeText}
          badInput={props.badInput}
          fieldAlert={props.fieldAlert}
          keyExtractor={props.keyExtractor}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff"
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
    icon: {
      padding: 5,
      alignContent: "center",
      alignItems: "center"
    },
  });

export default Input;