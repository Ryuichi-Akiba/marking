import React from 'react'
import {TextInput, View} from 'react-native'
import {normalize} from 'react-native-elements'
import ListFormView from '../forms/ListFormView'

export default class InputField extends React.PureComponent {
  static propTypes = {
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onClick: React.PropTypes.func,
    border: React.PropTypes.bool,
  };

  static defaultProps = {
    border: true,
  };

  constructor(props) {
    super(props);
    this.state = {value:props.input.value, valid:false};
  }

  onChangeText(value) {
    this.setState({value});
  }

  isValid() {
    const meta = this.props.meta;
    if (!!meta.submitFailed) {
      return !!meta.valid ? (!meta.dirty ? null : !!meta.valid) : !!meta.valid;
    }
    return !meta.dirty ? null : !!meta.valid;
  }

  render() {
    const {input, ...inputProps} = this.props;
    const onChangeText = (value) => {
      // redux-formとtext-inputの相性が悪いので無理やり日本語入力できるように修正
      this.onChangeText(value);
      input.onChange(value);
    };

    const textInput = (
      <TextInput style={{flex:1, height: 30, fontSize:normalize(14)}}
        {...inputProps}
                 onChangeText={onChangeText}
                 onBlur={input.onChange}
                 value={this.state.value}
                 placeholder={this.props.placeholder}
                 placeholderTextColor={'#999999'}
                 clearButtonMode="while-editing"
      />
    );

    return (
      <ListFormView icon={this.props.icon} component={textInput} border={this.props.border} valid={this.isValid()} margin={6}/>
    );
  }
}