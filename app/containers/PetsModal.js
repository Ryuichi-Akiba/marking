import React, {Component, PropTypes} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Styles from '../themes/Styles';

class PetsModal extends Component {

  render() {
    return(
      <View>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={false}>

        </Modal>
      </View>
    );
  }
}