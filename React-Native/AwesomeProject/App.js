import React from "react"
import { Alert } from "react-native"
import Loading from "./Loading"
import * as Location from "expo-location"
import axios from "axios"
import Weather from "./Weather"

const API_KEY = "d5745f1dbd21511762a243f344eaebf7"
export default class extends React.Component {
  // 리액트 컴포넌트 함수를 상속
  state = {
    isLoading: true,
  }

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )

    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
    })
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync()
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync() // es6 문법
      this.getWeather(latitude, longitude)
    } catch (error) {
      Alert.alert("Can't find you", "So sad")
    }
  }
  componentDidMount() {
    // 컴포넌트의 DOM이 마운트되고 나서 실행되는 함수  //외부 라이브러리 호출이나, 아작스 요청 같은 것들
    this.getLocation()
  }
  render() {
    const { isLoading, temp, condition } = this.state
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    )
  }
}
