/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  ListView, 
  AsyncStorage, 
  Keyboard
} from 'react-native';
import Header from "./header"
import Row from "./row"

export default class App extends Component {
  constructor(props) { 
    super(props); 
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { 
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([]),
      emptyMessage: "Add a Url" 
    }
    this.setSource = this.setSource.bind(this); 
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);

  }
  componentWillMount() {
    AsyncStorage.getItem("items").then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items);
      } catch (e) {
      }
    })
  }
  setSource(items,itemsDataSource, otherState = {}) { 
    this.setState({ 
      items, 
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource), 
      ...otherState
    })
    AsyncStorage.setItem("items", JSON.stringify(items));
  }
  handleRemoveItem(key) { 
    const newItems = this.state.items.filter((items) => { 
      return items.key !== key 
    })
    this.setSource(newItems, newItems)
  }
  handleAddItem() { 
    if(!this.state.value) return ; 
    const newItems = [
      ...this.state.items, 
      { 
        key: Date.now(), 
        text: this.state.value, 
        complete: false 
      }
    ]
    this.setSource(newItems, newItems)
  }
  renderIf(condition) {
    if (condition) {
      return (<ListView
        dataSource={this.state.dataSource}
        renderRow = { ({ key, ...value }) => {
        return (
          <Row
            key={key}
            onRemove={() => this.handleRemoveItem(key)}
            {...value}

          />

        )
      }
    }
    renderSeparator = { (sectionId, rowId) => {
      return <View key={rowId} style={styles.separator} />
    }
  }
        />)
    } else {
      return (<Text> add a url </Text>)
    }
  }

  renderEmptyMessage() { 
    return (
    <View >
      <Text>ADD A URL</Text>
    </View> 
    )
  }
  render() {
    const listViewCount = this.state.dataSource.getRowCount() == 0 ? 0.5 : 1
    return (

      <View id = "Container" >
        <Header 
        value = { this.state.value}
        onAddItem = {this.handleAddItem }
        onChange = { (value) => this.setState({value})}
        /> 
        <View id ="listview ">
          {this.renderIf(this.state.dataSource.getRowCount())}
 
 
 
        </View>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({ 
  separator: { 
    borderWidth: 1,
    borderColor: "#F5f5f5"
  }
  
})