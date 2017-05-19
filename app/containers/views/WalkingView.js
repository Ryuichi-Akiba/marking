import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

export default class WalkingView extends React.PureComponent {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={{flex:1}}>
        <MapView style={{...StyleSheet.absoluteFillObject}}/>
      </View>
    );
  }
}
