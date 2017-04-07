import React from 'react'
import {View} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

export default class NavbarIcon extends React.PureComponent {
  static propTypes = {
    onPress: React.PropTypes.func,
    icon: React.PropTypes.string,
    color: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const color = !!this.props.color ? this.props.color : '#FF9800';
    return (
      <View style={{flexDirection: 'row', marginLeft:8, marginTop:10}}>
        <MAIcon name={this.props.icon} size={24} color={color} onPress={this.props.onPress}/>
      </View>
    );
  }
}