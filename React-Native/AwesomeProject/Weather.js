import React from "react"
import { View, Text, StyleSheet, StatusBar } from "react-native"
import PropTypes from "prop-types"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const weatherOptions = {
  Haze: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Drizzle: {
    iconName: "weather-rainy",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Rain: {
    iconName: "weather-pouring",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Atmosphere: {
    iconName: "weather-windy-variant",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Windy: {
    iconName: "weather-windy",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Dust: {
    iconName: "weather-fog",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Sunny: {
    iconName: "weather-sunny",
    gradient: ["#4DA0B0", "#D39D38"],
  },
}
export default function Weather({ temp, condition }) {
  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          size={90}
          name={weatherOptions[condition].iconName}
          color="white"
        ></MaterialCommunityIcons>
        <Text style={styles.text}>{temp}</Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.text}>Titledfdsfdsfdsfdsf</Text>
        <Text style={styles.subtitle}>Subtitlesdfsdfsdfsds</Text>
      </View>
    </LinearGradient>
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
    "Sunny",
    "Windy",
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
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 70,
  },
  subtitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
})
