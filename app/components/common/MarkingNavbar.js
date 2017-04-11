import React from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet, Navigator} from 'react-native'
import NavigationBar from 'react-native-navbar'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

export default class MarkingNavbar extends React.PureComponent {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    drawer: React.PropTypes.object,
    left: React.PropTypes.object,
    right: React.PropTypes.object,
    transparent: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const titleConfig = {
      title: this.props.title,
    };

    var leftButtonConfig = null;
    if (this.props.drawer) {
      leftButtonConfig = (
        <View style={{flexDirection: 'row', marginLeft:8, marginTop:10}}>
          <MAIcon name="menu" size={24} color={'#333333'} onPress={this.props.drawer.open}/>
        </View>
      );
    } else if (this.props.left) {
      leftButtonConfig = this.props.left;
    }

    const rightButtonConfig = !!this.props.right ? this.props.right : null;
    const containerStyle = !!this.props.transparent ? {backgroundColor:'rgba(0,0,0,0)'} : {};

    return (
      <View>
        <NavigationBar containerStyle={containerStyle} title={titleConfig} leftButton={leftButtonConfig} rightButton={rightButtonConfig}/>
      </View>
    );
  }
}