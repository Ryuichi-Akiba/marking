import React from 'react'
import {View} from 'react-native'
import List from '../elements/List'
import Label from '../elements/Label'

export default class SelectableListViewField extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    converter: React.PropTypes.func, // SelectableListViewSceneに渡したオブジェクトを選択後に文字変換するためのコンバータ
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
      const converted = this.props.converter(value);
      this.props.input.onChange(converted);
    };
    this.props.navigator.push({
      name: 'SelectableListViewScene',
      props: {
        data: this.props.data,
        onSelect: handleSelect
      }
    });
  }

  render() {
    const input = this.props.input;
    const text = !!input.value ? <Label>{input.value}</Label> : <Label placeholder={true}>{this.props.placeholder}</Label>;

    return (
      <View>
        <List icon={this.props.icon} title={text} chevron={true} onPress={this.openModal.bind(this)} border={this.props.border}/>
      </View>
    );
  }
}