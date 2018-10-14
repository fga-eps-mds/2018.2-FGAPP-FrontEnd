import React from "react";
import { View, StyleSheet } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  Entypo
} from "@expo/vector-icons";
import { DefaultTheme, TextInput, Provider as PaperProvider } from "react-native-paper";

const Input = props => {
  return (
    <View style={styles.inputContainer}>
      {props.iconType == "MaterialIcons" ||
        (props.iconType == null && (
          <MaterialIcons style={styles.icon} name={props.iconName} size={26} />
        ))}
      {props.iconType == "Entypo" && (
        <Entypo style={styles.icon} name={props.iconName} size={26} />
      )}
      {props.iconType == "MaterialCommunityIcons" && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={props.iconName}
          size={26}
        />
      )}

      <TextInput
        theme={{
          dark: true,
          colors: { ...DefaultTheme.colors, primary: "green", accent: "red", roundness: 2 }
        }}
        mode="flat" // Linhas em volta do input
        label={props.label} //Nome do campo
        style={styles.input}
        returnKeyType="next"
        keyboardType={props.keyboardType ? props.keyboardType : "default"}
        onChangeText={props.onChangeText}
        badInput={props.badInput}
        fieldAlert={props.fieldAlert}
        keyExtractor={props.keyExtractor}
      />
    </View>
  );
};

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
    marginLeft: 0,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  icon: {
    padding: 5,
    alignContent: "center",
    alignItems: "center"
  }
});

export default Input;
