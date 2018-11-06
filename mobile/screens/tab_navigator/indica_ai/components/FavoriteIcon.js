import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const w = Dimensions.get("window");
export default class App extends React.Component {
  state = {
    liked: false,
  };

  toggleLike = () =>{
    this.setState(state => ({ liked: !state.liked }))
    this.props.favMessage(this.state.liked)

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={this.toggleLike
          }>
            <Image style = {{alignItems: "center", justifyContent: "center"}}
              source={
                this.state.liked
                  ? require("../assets/heart.png")
                  : require("../assets/heart-outline.png")
              }
              style={styles.heartIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  iconRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  heartIcon: {
    width: 30,
    height: 30
  }
});
