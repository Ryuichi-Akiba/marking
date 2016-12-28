import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Actions} from 'react-native-router-flux';
import Styles from '../themes/Styles';
// import {connect} from "react-redux";

class MarkingMap extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.instructions}>
          MarkingMap Page!
        </Text>
      </View>
    );
  }
}

export default MarkingMap;

// function mapStateToProps(state) {
//   return {};
// }
//
// function mapDispatchToProps(dispatch) {
//   return {};
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(MarkingMap);
