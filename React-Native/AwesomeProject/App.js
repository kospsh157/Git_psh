import React from "react"
import { Alert } from "react-native"
import Loading from "./Loading"
import * as Location from "expo-location"

export default class extends React.Component {
  // 리액트 컴포넌트 함수를 상속
  state = {
    isLoading: true,
  }
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync()
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync() // es6 문법
      this.setState({ isLoading: false })
    } catch (error) {
      Alert.alert("Can't find you", "So sad")
    }
  }
  componentDidMount() {
    this.getLocation()
  }
  render() {
    const { isLoading } = this.state
    return isLoading ? <Loading /> : null
  }
}
