import React from "react";
import {Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabIcon extends React.Component {
  render(){
    return (
      <Icon name="rocket" size={24} color={this.props.selected ? '#000000' : '#666666'} />
      // <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
    );
  }
}
