import React, {PropTypes} from "react";
import {StyleSheet, Text, View, Button, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginButton, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-router-flux'
import Styles from '../themes/Styles';
import * as homeActions from '../redux/reducers/home';

class AddMyPetForm extends React.Component {
  render() {
    return (
      <View>
        <Text>Add My Pet Form</Text>
      </View>
    );
  }
}

AddMyPetForm.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    state: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, homeActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMyPetForm);
