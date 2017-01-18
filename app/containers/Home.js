import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import MKGButton from '../components/MKGButton';
import Styles from '../themes/Styles';
// import {connect} from "react-redux";

class Home extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={Styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={Styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableOpacity onPress={Actions.tabbar}>
          <Text style={Styles.instructions}>Go to MyPets Page</Text>
        </TouchableOpacity>

        <MKGButton onPress={Actions.tabbar} caption={'Login with Facebook'} type={'primary'}></MKGButton>
      </View>
//       <View style={Styles.row}>
//         <Text style={Styles.rowLabel}>
//           Welcome to React Native Home!
//         </Text>
//         <TouchableOpacity onPress={Actions.MyPets}>
//           <Text style={Styles.rowLabel}>Go to MyPets Page</Text>
//         </TouchableOpacity>
//       </View>
    );
  }
}

export default Home;

// function mapStateToProps(state) {
//   return {};
// }
//
// function mapDispatchToProps(dispatch) {
//   return {};
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
