import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DatePicker from 'react-native-datepicker'

/**
 * to be wrapped with redux-form Field component
 */
export default class DatePickerField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {date:"2016-05-15"};
  }

  render() {
    const {input, meta, ...inputProps} = this.props;

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
        <Text>{this.props.label}</Text>
        <DatePicker
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date})}}
        />
      </View>
    );
  }
}