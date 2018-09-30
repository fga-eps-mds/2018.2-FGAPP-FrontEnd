import React from 'react'
import {View,Text, StyleSheet} from 'react-native'

const Title = (props) => {
	return(
		<View style={styles.titleContainer}>
            <Text style={styles.titleText}>{props.titleText}</Text>
        </View>
	)
}

export default Title

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
		fontSize: 25,
		fontWeight: "bold"
	  },
})