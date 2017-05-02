import React from 'react'
import {StyleSheet, View, TouchableHighlight} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../themes/Colors'

export default class List extends React.PureComponent {
  static propTypes = {
    onPress: React.PropTypes.func,
    icon: React.PropTypes.string,
    component: React.PropTypes.element,
    border: React.PropTypes.bool,
    margin: React.PropTypes.number,
    valid: React.PropTypes.bool, // 正常値であれば緑、異常値であれば赤のアイコンにするためのフラグ
  };

  static defaultProps = {
    valid: undefined,
    padding: true,
  };

  constructor(props) {
    super(props);
  }

  getIconColor() {
    if (this.props.valid === undefined || this.props.valid === null) {
      return '#BDBDBD';
    } else if (this.props.valid === true) {
      return '#8BC34A';
    } else {
      return '#D32F2F';
    }
  }

  renderIconContainer() {
    const margin = !!this.props.subtitle ? 4 : 0;

    // アイコンが指定されている場合
    var icon = null;
    if (this.props.icon) {
      icon = <MAIcon name={this.props.icon} size={24} color={this.getIconColor()} style={{marginTop:margin}}/>;
    }

    // アイコンエリアを描画する
    return (
      <View style={{width:48, paddingTop:8, paddingLeft:12, paddingRight:12, marginTop:margin}}>
        {icon}
      </View>
    );
  }

  wrap(component) {
    if (this.props.onPress) {
      return (
        <TouchableHighlight underlayColor={Colors.onPressColor} onPress={this.props.onPress}>
          {component}
        </TouchableHighlight>
      );
    }
    return component;
  }

  render() {
    const border = !!this.props.border ? 0.5 : 0;
    const component = (
      <View style={{flex:1, flexDirection:'row'}}>
        {this.renderIconContainer()}
        <View style={{flex:1, flexDirection:'row', borderBottomWidth:border, borderBottomColor:Colors.borderColor, paddingTop:this.props.margin, paddingBottom:this.props.margin, paddingRight:8}}>
          {this.props.component}
        </View>
      </View>
    );
    return this.wrap(component);
  }
}