import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import Colors from '../../themes/Colors'

// アバターがない時のランダムな色
const colors = [
  Colors.pink,
  Colors.brown,
  Colors.indigo,
  Colors.deepOrange,
  Colors.cyan,
  Colors.green,
  Colors.blue,
  Colors.purple,
  Colors.blueGray,
  Colors.red
];

// アバターコンポーネント
export default class Avatar extends React.PureComponent {
  static propTypes = {
    source: React.PropTypes.object.isRequired,
    name: React.PropTypes.string,
    size: React.PropTypes.oneOf(['large', 'middle', 'small']),
    onPress: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  wrap(component) {
    if (this.props.onPress) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          {component}
        </TouchableOpacity>
      );
    } else {
      return component;
    }
  }

  render() {
    const size = this.props.size === 'large' ? 128 : this.props.size === 'small' ? 24 : 48;
    const minus = this.props.size === 'large' ? 8 : this.props.size === 'small' ? 2 : 4;

    var component = null;
    if (this.props.source.uri) {
      // アバターイメージ
      component = <Image source={this.props.source} style={[{width:size, height:size, borderRadius:size / 2}, this.props.style]}/>;
    } else {
      // アバターがないのでイニシャル表示
      const initial = this.props.name ? this.props.name.substring(0, 1) : '?';
      const color = this.props.name ? colors[this.props.name.length % 10] : colors[0];
      component = (
        <View style={[{width:size, height:size, borderRadius:size, backgroundColor:color, justifyContent:'center', alignItems:'center'}, this.props.style]}>
          <Text style={{fontSize:size / 2 - minus, color:Colors.white}}>{initial}</Text>
        </View>
      );
    }

    return this.wrap(component);
  }
}