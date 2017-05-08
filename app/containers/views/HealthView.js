import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import PetImage from '../../components/pets/PetImage'
import Label from '../../components/elements/Label'
import Badge from '../../components/elements/Badge'
import Colors from '../../themes/Colors'

export default class HealthView extends React.PureComponent {
  static propTypes = {
    pet: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {date:moment()};
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <PetImage source={{uri:this.props.pet.image}} size="large"/>
          <Label color={Colors.lightBlue} size="large">43 min / 2,234 m</Label>
          <Label>ここにグラフを描画</Label>
        </View>
      </View>
    );
  }
}
