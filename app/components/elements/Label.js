import React from 'react'
import {Text, normalize} from 'react-native-elements'

// スタイルを共通化したラベルコンポーネント
export default class Label extends React.PureComponent {
  static propTypes = {
    placeholder: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const color = !!this.props.placeholder ? '#9E9E9E' : '#212121';

    return (
      <Text style={{fontSize:normalize(14), color:color}} {...this.props}>{this.props.children}</Text>
    );
  }
}