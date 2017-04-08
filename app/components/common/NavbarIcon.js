import React from 'react'
import {View, TouchableHighlight} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import Label from '../elements/Label'

export default class NavbarIcon extends React.PureComponent {
  static propTypes = {
    onPress: React.PropTypes.func,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    color: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const color = !!this.props.color ? this.props.color : '#FF9800';

    if (this.props.label) {
      return this.renderLink(color);
    }

    return (
      <View style={{flexDirection: 'row', marginLeft:8, marginRight:8, marginTop:10}}>
        <MAIcon name={this.props.icon} size={24} color={color} onPress={this.props.onPress}/>
      </View>
    );
  }

  renderLink(color) {
    return (
      <TouchableHighlight underlayColor="#FFFFFF" onPress={this.props.onPress}>
        <View style={{flexDirection: 'row', marginLeft:8, marginRight:8, marginTop:13}}>
          <Label style={{color:color, fontSize:16}}>{this.props.label}</Label>
        </View>
      </TouchableHighlight>
    );
  }
}