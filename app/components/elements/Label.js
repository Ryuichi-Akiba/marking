import React from 'react'
import {Text} from 'react-native'
import {normalize} from 'react-native-elements'
import Colors from '../../themes/Colors'

// スタイルを共通化したラベルコンポーネント
export default class Label extends React.PureComponent {
  static propTypes = {
    placeholder: React.PropTypes.bool,
    large: React.PropTypes.bool,
    small: React.PropTypes.bool,
    color: React.PropTypes.string,
    bold: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['xl', 'large', 'middle', 'small']),
    style: React.PropTypes.object,
    numberOfLines: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const fontSize = this.props.size === 'small' ? normalize(12) : this.props.size === 'large' ? normalize(18) : this.props.size === 'xl' ? normalize(24) : normalize(14);

    const color = !!this.props.placeholder ? '#9E9E9E' : !!this.props.color ? this.props.color : Colors.text;
    const weight = !!this.props.bold ? 'bold' : 'normal';
    return (
      <Text style={[this.props.style, {fontSize:fontSize, color:color, fontWeight:weight}]} numberOfLines={this.props.numberOfLines}>{this.props.children}</Text>
    );
  }
}