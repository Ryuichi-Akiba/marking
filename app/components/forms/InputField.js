import React from 'react'
import {TextInput, View, Text, StyleSheet} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

/**
 * to be wrapped with redux-form Field component
 */
export default class InputField extends React.PureComponent {
  static propTypes = {
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onClick: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {value: props.input.value};
  }

  onChangeText(value) {
    this.setState({value});
  }

  render() {
    const {input, ...inputProps} = this.props;
    const onChangeText = (value) => {
      // redux-formとtext-inputの相性が悪いので無理やり日本語入力できるように修正
      this.onChangeText(value);
      input.onChange(value);
    };

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 45, height: 30, paddingLeft: 5}}>
          <MAIcon name={this.props.icon} size={24} color={'#666666'} style={{paddingTop: 5, paddingBottom: 5}}/>
        </View>
        <View style={{flex: 1, position: 'relative', justifyContent: 'center'}}>
          <TextInput style={{height: 32, fontSize: 16, }}
            {...inputProps}
                     onChangeText={onChangeText}
                     onBlur={input.onChange}
                     value={this.state.value}
                     placeholder={this.props.placeholder}
                     placeholderTextColor={'#999999'}
                     clearButtonMode="while-editing"
          />
        </View>
      </View>
    );
  }
}