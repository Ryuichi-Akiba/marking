import React from 'react'
import {Text, normalize} from 'react-native-elements'
import Colors from '../../themes/Colors'

// スタイルを共通化したラベルコンポーネント
export default class Label extends React.PureComponent {
  static propTypes = {
    placeholder: React.PropTypes.bool,
    small: React.PropTypes.bool,
    color: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const fontSize = !!this.props.small ? normalize(10) : normalize(14);
    const color = !!this.props.placeholder ? '#9E9E9E' : !!this.props.color ? this.props.color : Colors.text;
    return (
      <Text style={{fontSize:fontSize, color:color}} {...this.props}>{this.props.children}</Text>
    );
  }
}