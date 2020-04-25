import React from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { MaterialCommunityIcons } from "@expo/vector-icons"
export default function Weather({ temp }) {
  return (
    <View style={styles.container}>
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          size={90}
          name="weather-lightning-rainy"
        ></MaterialCommunityIcons>
        <Text style={styles.text}>{temp}</Text>
      </View>
      <View style={styles.halfContainer}></View>
    </View>
  )
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Dust",
  ]).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 36,
  },
})
