import React from 'react'
import {View, DatePickerIOS} from 'react-native'
import moment from 'moment'
import Label from '../elements/Label'
import ListFormView from '../forms/ListFormView'

export default class DatePickerField extends React.PureComponent {
  static propTypes = {
    // map from component
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    // map from redux-form
    input: React.PropTypes.object,
    border: React.PropTypes.bool,
  };

  static defaultProps = {
    border: true,
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

  isValid() {
    const meta = this.props.meta;
    if (!!meta.submitFailed) {
      return !!meta.valid ? (!meta.dirty ? null : !!meta.valid) : !!meta.valid;
    }
    return !meta.dirty ? null : !!meta.valid;
  }

  render() {
    const input = this.props.input;
    const text = !!input.value ? <Label>{moment(input.value).format('YYYY-MM-DD')}</Label> : <Label placeholder={true}>{this.props.placeholder}</Label>;

    var pickerComponent = null;
    if (this.state.show) {
      pickerComponent = <DatePickerIOS date={this.state.date} mode="date" timeZoneOffsetInMinutes={9 * 60} onDateChange={this.onDateChange.bind(this)}/>;
    }

    return (
      <View>
        <ListFormView icon={this.props.icon} component={text} onPress={this.toggle.bind(this)} border={this.props.border} valid={this.isValid()} margin={12}/>
        {pickerComponent}
      </View>
    );
  }
}