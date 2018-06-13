import React, { Component } from 'react'
import { Text, View,StyleSheet, TextInput, TouchableOpacity } from 'react-native'

export default class header extends Component {
  render() {
    return (
      <View style = {styles.header}>
        <TextInput
        value = {this.props.value} 
        placeholder = "www.yourURl.com"
        onSubmitEditing = { this.props.onAddItem}
        blurOnSubmit = { false}
        onChangeText = { this.props.onChange}
        returnKeyType = "done"
        style = { styles.input}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({ 
    header: { 
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }, 
    input: { 
        flex: 1 , 
        height: 50 
    }
})
    
