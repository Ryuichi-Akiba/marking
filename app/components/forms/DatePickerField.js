import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight, DatePickerIOS} from 'react-native'
import moment from 'moment'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

export default class DatePickerField extends React.PureComponent {
  static propTypes = {
    // TODO required?
    onPress: React.PropTypes.func,
    label: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    selected: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {date:new Date(), show:false};
  }

  toggle() {
    this.setState({show:!this.state.show});
  }

  onDateChange(value) {
    this.setState({date:value});
    this.props.input.onChange(value);
  }

  render() {
    const {input, meta, ...inputProps} = this.props;
    const text = !!input.value ? (
      <Text style={{height: 32, fontSize: 16, paddingTop: 8,}}>{moment(input.value).format('YYYY-MM-DD')}</Text>) : (<Text style={{height: 32, color: '#999999', fontSize: 16, paddingTop: 8,}}>{this.props.placeholder}</Text>);

    var picker = null;
    if (this.state.show) {
      picker = <DatePickerIOS
        date={this.state.date}
        mode='date'
        timeZoneOffsetInMinutes={9 * 60}
        onDateChange={this.onDateChange.bind(this)}
      />;
    }

    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 45, height: 30, paddingLeft: 5}}>
            <MAIcon name={this.props.icon} size={24} color={'#666666'} style={{paddingTop: 5, paddingBottom: 5}}/>
          </View>
          <TouchableHighlight underlayColor={'#ffffff'} style={{flex: 1, position: 'relative', justifyContent: 'center'}} onPress={this.toggle.bind(this)}>
            {text}
          </TouchableHighlight>
        </View>
        <View style={{flex:1}}>
          {picker}
        </View>
      </View>
    );
  }
}