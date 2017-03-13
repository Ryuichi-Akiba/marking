import React from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet, Navigator} from 'react-native'
import NavigationBar from 'react-native-navbar'

export default class MarkingNavbar extends React.PureComponent {
  static propTypes = {
    openDrawer: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    left: React.PropTypes.object,
    right: React.PropTypes.object,
  };
  static contextTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const leftButtonConfig = {
      title: 'Next',
      handler: this.props.openDrawer,
    };
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