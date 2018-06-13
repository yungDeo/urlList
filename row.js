import React, { Component } from 'react'
import { Text, View , StyleSheet,TouchableOpacity } from 'react-native'

export default class Row extends Component {
  render() {
    return (
      <View>
      <Text> { this.props.text} </Text>
      <TouchableOpacity onPress = { this.props.onRemove}>
      <Text>X</Text>
      </TouchableOpacity>
      </View>
    )
  }
}