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
  };

  constructor(props) {
    super(props);
  }

  render() {
    var leftButton = null;
    if (this.props.drawer) {
      leftButton = (
        <View style={{flexDirection: 'row', marginLeft:8, marginTop:10}}>
          <MAIcon name="menu" size={24} color={'#333333'} onPress={this.props.drawer.open}/>
        </View>
      );
    }

    const rightButtonConfig = !!this.props.right ? this.props.right : null;
    const titleConfig = {
      title: this.props.title,
    };

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButton}
          rightButton={rightButtonConfig}
        />
      </View>
    );
  }
}