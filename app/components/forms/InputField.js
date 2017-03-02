import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
export default function InputField(props) {
  const {input, meta, ...inputProps} = props;

  const styles = StyleSheet.create({
    input: {
      borderColor: 'black',
      borderWidth: 1,
      height: 37,
      width: 250
    }
  })

  return (
    <View>
      <Text>{props.label}</Text>
      <TextInput style={styles.input}
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
    </View>
  );
}