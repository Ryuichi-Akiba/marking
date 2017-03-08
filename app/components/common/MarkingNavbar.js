import React from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet, Navigator} from 'react-native'
import NavigationBar from 'react-native-navbar'

export default class MarkingNavbar extends React.PureComponent {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    left: React.PropTypes.object,
    right: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const leftButtonConfig = !!this.props.left ? this.props.left : null;
    const rightButtonConfig = !!this.props.right ? this.props.right : null;
    const titleConfig = {
      title: this.props.title,
    };

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
        />
      </View>
    );
  }
}