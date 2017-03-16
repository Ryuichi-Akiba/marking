import React from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet, Navigator} from 'react-native'
import NavigationBar from 'react-native-navbar'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

export default class MarkingNavbar extends React.PureComponent {
  static propTypes = {
    drawer: React.PropTypes.object,
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
    var leftButtonConfig = null;
    if (this.props.drawer) {
      leftButtonConfig = {
        title: <MAIcon name="menu" size={24} color={'#333333'}/>,
        handler: this.props.drawer.open,
      };
    }

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