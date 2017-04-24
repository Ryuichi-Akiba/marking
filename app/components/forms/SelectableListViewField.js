import React from 'react'
import {View} from 'react-native'
import List from '../elements/List'
import Label from '../elements/Label'

export default class SelectableListViewField extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    search: React.PropTypes.bool,
    converter: React.PropTypes.func,
    // map from component
    label: React.PropTypes.string,
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    // map from redux-form
    input: React.PropTypes.object,
    border: React.PropTypes.bool,
  };

  static defaultProps = {
    converter: (value) => value,
    border: true,
  };

  constructor(props) {
    super(props);
  }

  openModal() {
    const handleSelect = (value) => {
      this.props.input.onChange(value);
    };

    this.props.navigator.push({
      name: 'SelectableListViewScene',
      props: {
        data: this.props.data,
        onSelect: handleSelect,
        converter: this.props.converter,
        search: this.props.search
      }
    });
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
    const text = !!input.value ? <Label>{this.props.converter(input.value)}</Label> : <Label placeholder={true}>{this.props.placeholder}</Label>;

    return (
      <View>
        <List icon={this.props.icon} title={text} chevron={true} onPress={this.openModal.bind(this)} border={this.props.border} valid={this.isValid()}/>
      </View>
    );
  }
}