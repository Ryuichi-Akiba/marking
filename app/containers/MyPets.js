import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, MarkingMap, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import Styles from '../themes/Styles';
// import {connect} from "react-redux";

class MyPets extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.welcome}>
          MyPets Page!
        </Text>
        <TouchableOpacity onPress={Actions.MarkingMap}>
          <Text style={Styles.instructions}>Go to Map Page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MyPets;

// function mapStateToProps(state) {
//   return {};
// }
//
// function mapDispatchToProps(dispatch) {
//   return {};
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(MyPets);
