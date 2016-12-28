import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Actions} from 'react-native-router-flux';
import Styles from '../themes/Styles';
// import {connect} from "react-redux";
import MapView from 'react-native-maps'

class MarkingMap extends Component {
  render() {
    return (
      // <View style={Styles.container}>
      //   <Text style={Styles.instructions}>
      //     MarkingMap Page!
      //   </Text>
      // </View>
      <View style={Styles.container}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
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
