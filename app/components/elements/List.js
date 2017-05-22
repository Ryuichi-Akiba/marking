import React from 'react'
import {StyleSheet, View, Text, Image, Switch, TouchableHighlight} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import Label from './Label'
import Avatar from './Avatar'
import Colors from '../../themes/Colors'

export default class List extends React.PureComponent {
  static propTypes = {
    onPress: React.PropTypes.func,
    avatar: React.PropTypes.any,
    icon: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    title: React.PropTypes.string,
    titleLines: React.PropTypes.number,
    subtitle: React.PropTypes.string,
    subtitleLines: React.PropTypes.number,
    border: React.PropTypes.bool,
    chevron: React.PropTypes.bool,
    rightTitle: React.PropTypes.string,
    style: React.PropTypes.object,
    toggle: React.PropTypes.bool,
    switcher: React.PropTypes.bool,
    onChangeSwitch: React.PropTypes.func,
  };

  static defaultProps = {
    iconColor: Colors.gray,
    titleLines: 1,
    subtitleLines: 1,
    valid: undefined,
    padding: true,
    border: true,
  };

  constructor(props) {
    super(props);
    this.state = {trueSwitchIsOn: !!this.props.toggle};
  }

  renderIconContainer() {
    const margin = !!this.props.subtitle ? 4 : 0;

    // アイコンが指定されている場合
    var icon = null;
    if (this.props.icon) {
      icon = <MAIcon name={this.props.icon} size={24} color={this.props.iconColor} style={{marginTop:margin}}/>;
    }

    // アバターが指定されている場合
    if (this.props.avatar) {
      icon = <Avatar source={this.props.avatar} name={this.props.title} size="small" style={{marginTop:margin}}/>
    }

    // アイコンエリアを描画する
    return (
      <View style={{width:56, paddingTop:10, paddingLeft:16, paddingRight:16, marginTop:margin}}>
        {icon}
      </View>
    );
  }

  renderTitleContainer() {
    // コンテンツ部分の余白を条件によって動的に変更する
    const padding = !!this.props.subtitle ? 10 : 14;
    const left = !!this.props.icon || !!this.props.avatar ? 0 : 8;
    const style = {flex:1, paddingTop:padding, paddingBottom:padding, paddingLeft:left};

    var sub = null;
    if (this.props.subtitle) {
      sub = <Label color={Colors.gray} size="small" numberOfLines={this.props.titleLines} style={{marginTop:2}}>{this.props.subtitle}</Label>
    }

    return (
      <View style={style}>
        <Label numberOfLines={this.props.titleLines}>{this.props.title}</Label>
        {sub}
      </View>
    );
  }

  renderRightContent() {
    if (this.props.rightTitle) {
      const padding = !!this.props.subtitle ? 10 : 12;
      const right = !!this.props.chevron ? 0 : 24;
      const style = {paddingTop:padding, paddingBottom:padding, paddingRight:right};
      return (
        <View style={style}>
          <Label color={Colors.gray}>{this.props.rightTitle}</Label>
        </View>
      );
    }
    return null;
  }

  renderChevron() {
    if (this.props.chevron) {
      const padding = !!this.props.subtitle ? 16 : 10;
      return (
        <View style={{paddingTop:padding, paddingBottom:padding}}>
          <MAIcon name="chevron-right" size={24} color={Colors.borderColor}/>
        </View>
      );
    }
    return null;
  }

  renderSwitcher() {
    if (!!this.props.switcher) {
      const handler = (value) => {
        this.setState({trueSwitchIsOn:value});
        if (this.props.onChangeSwitch) {
          this.props.onChangeSwitch(value);
        }
      };
      return <Switch onValueChange={handler} value={this.state.trueSwitchIsOn} style={{marginTop:6, marginRight:8}} onTintColor={Colors.primary}/>;
    }
    return null;
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
      <View style={[{flex:1, flexDirection:'row'}, this.props.style]}>
        {this.renderIconContainer()}

        <View style={{flex:1, flexDirection:'row', borderBottomWidth:border, borderBottomColor:Colors.borderColor, paddingRight:8}}>
          {this.renderTitleContainer()}
          {this.renderRightContent()}
          {this.renderChevron()}
          {this.renderSwitcher()}
        </View>
      </View>
    );
    return this.wrap(component);
  }
}