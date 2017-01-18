import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MKGButton extends React.Component {
  props: {
    type: 'primary' | 'secondary' | 'bordered';
    icon?: number;
    caption: string;
    style?: any;
    onPress: () => mixed;
  };

  render(){
    var content = (
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          Login with Facebook
        </Text>
      </View>
    );

    return (
      <TouchableOpacity accessibilityTraits="button" onPress={this.props.onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  button: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3F51B5',
    borderRadius: HEIGHT / 2,
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
