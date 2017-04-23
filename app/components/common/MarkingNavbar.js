import React from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet, Navigator} from 'react-native'
import NavigationBar from 'react-native-navbar'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../themes/Colors'

const IconConfig = {
  icon: React.PropTypes.string.isRequired,
  handler: React.PropTypes.func,
};
const LinkConfig = {
  title: React.PropTypes.string.isRequired,
  handler: React.PropTypes.func,
};

export default class MarkingNavbar extends React.PureComponent {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    left: React.PropTypes.oneOfType([React.PropTypes.shape(IconConfig), React.PropTypes.shape(LinkConfig)]),
    right: React.PropTypes.oneOfType([React.PropTypes.shape(IconConfig), React.PropTypes.shape(LinkConfig)]),
    transparent: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  title() {
    const color = !!this.props.transparent ? Colors.white : Colors.text;
    return {
      title: this.props.title,
      tintColor: color,
    };
  }

  left() {
    if (!this.props.left) {
      return null;
    }
    return this.renderSideButton(this.props.left.title, this.props.left.icon, this.props.left.handler);
  }

  right() {
    if (!this.props.right) {
      return null;
    }
    return this.renderSideButton(this.props.right.title, this.props.right.icon, this.props.right.handler);
  }

  renderSideButton(title : string, icon : string, handler) {
    const color = !!this.props.transparent ? Colors.white : Colors.pink;
    if (icon) {
      return (
        <View style={{flexDirection: 'row', marginLeft:8, marginRight:8, marginTop:10}}>
          <MAIcon name={icon} size={24} color={color} onPress={handler}/>
        </View>
      );
    } else {
      return {title:title, tintColor:color, handler:handler};
    }
  }

  render() {
    const containerStyle = !!this.props.transparent ? {backgroundColor:'rgba(0,0,0,0)'} : {};
    return (
      <NavigationBar containerStyle={containerStyle} title={this.title()} leftButton={this.left()} rightButton={this.right()}/>
    );
  }
}