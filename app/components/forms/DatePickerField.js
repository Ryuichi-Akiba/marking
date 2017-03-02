
import React from 'react';
import {DatePickerIOS, View, Text, StyleSheet} from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
export default function DatePickerField(props) {
  const {input, meta, ...inputProps} = props;

  const styles = StyleSheet.create({
    input: {
      borderColor: 'black',
      borderWidth: 1,
      height: 37,
      width: 250
    }
  });

  var date = new Date();

  return (
    <View>
      <Text>{props.label}</Text>
      <DatePickerIOS
        {...inputProps}
        date={date}
        mode="date"
        onDateChange={input.onChange}
      />
    </View>
  );
}