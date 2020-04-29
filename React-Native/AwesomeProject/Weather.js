import React from "react"
import { View, Text, StyleSheet, StatusBar, Button } from "react-native"
import PropTypes from "prop-types"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const weatherOptions = {
  Haze: {
    iconName: "weather-hail",
    gradient: ["#03f4fc", "#ffff"],
    title: "Haze",
    subtitle: "I don't know it's fog or haze",
  },
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#0328fc", "#03b1fc"],
    title: "Thunderstorm",
    subtitle: "Ok U can charge u r phone But u will die",
  },
  Drizzle: {
    iconName: "weather-rainy",
    gradient: ["#03f4fc", "#0394fc"],
    title: "Drizzle",
    subtitle: "I'm not sure if you need an umblrella or not",
  },
  Rain: {
    iconName: "weather-pouring",
    gradient: ["#2d03fc", "#D39D38"],
    title: "Rain",
    subtitle: "Fuck, You must have an umbrella",
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#b8dcf5", "#fff"],
    title: "Snow",
    subtitle: "Fuck snow, u can understand If you were discharged",
  },
  Atmosphere: {
    iconName: "weather-windy-variant",
    gradient: ["#b8f5f0", "#e6f2f1"],
    title: "Atmosphere",
    subtitle: "I don't know what means 'Atmosphere'",
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "Clear",
    subtitle: "GO OUT DO SOMETHING",
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#cef2db", "#cef2ee"],
    title: "Clouds",
    subtitle: "GO OUT? MAY BE..",
  },
  Windy: {
    iconName: "weather-windy",
    gradient: ["#403bd4", "#4700ed"],
    title: "Windy",
    subtitle: "Are u Crazy? yeap, your hair is Crazy at least",
  },
  Dust: {
    iconName: "weather-fog",
    gradient: ["#ffc71f", "#D39D38"],
    title: "Dust",
    subtitle: "China should pay for it",
  },
  Sunny: {
    iconName: "weather-sunny",
    gradient: ["#ff3838", "#fce808"],
    title: "Sunny",
    subtitle: "Waht a u doing? It's sunny day huh",
  },
}

export default function Weather({ reload, temp, condition, name }) {
  buttonClickListener = () => {
    alert("Clicked On Button !!!")
  }
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
        <Text style={styles.temp}>{temp}</Text>
        <Text style={styles.temp}>{name}</Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>{weatherOptions[condition].title}</Text>
        <Text style={styles.subtitle}>
          {weatherOptions[condition].subtitle}
        </Text>
      </View>

      <MaterialCommunityIcons
        size={30}
        name="reload"
        color="white"
        style={styles.reloadIcon}
      ></MaterialCommunityIcons>

      <Button onPress={() => buttonClickListener} title="RELOAD"></Button>
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
  temp: {
    fontSize: 36,
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
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
  reloadIcon: {
    marginBottom: 40,
  },
})
