import React from 'react'
import {StyleSheet} from 'react-native'
import {ListItem, normalize} from 'react-native-elements'
import Colors from '../../themes/Colors'

var styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default class List extends React.PureComponent {
  static propTypes = {
    onPress: React.PropTypes.func,
    avatar: React.PropTypes.any,
    icon: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    title: React.PropTypes.any,
    subtitle: React.PropTypes.any,
    border: React.PropTypes.bool,
    chevron: React.PropTypes.bool,
    hideChevron: React.PropTypes.bool,
    rightTitle: React.PropTypes.string,
    padding: React.PropTypes.bool,
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
    if (this.props.iconColor) {
      return this.props.iconColor;
    } else if (this.props.valid === undefined || this.props.valid === null) {
      return '#BDBDBD';
    } else if (this.props.valid === true) {
      return '#8BC34A';
    } else {
      return '#D32F2F';
    }
  }

  render() {
    const border = this.props.border === undefined || !!this.props.border ? 0.5 : 0;
    const wrap = this.props.subtitle ? 6 : 0;

    const iconColor = this.getIconColor();
    const leftIcon = !!this.props.icon ? {name:this.props.icon, style:[styles.icon, {color:iconColor}]} : {};
    const avatarStyle = !!this.props.avatar ? {marginLeft:5, marginRight:13, marginTop:2 + wrap, width:24, height:24, borderRadius:12} : {};
    const containerStyle = {borderBottomColor:'#E0E0E0', borderBottomWidth:border, paddingTop:8, paddingBottom:8};
    const titleStyle = !!this.props.title ? {color:Colors.text} : {};
    const subtitleStyle = !!this.props.subtitle ? {color:Colors.gray, fontWeight:'normal', marginTop:4} : {};
    const chevronColor = !!this.props.chevron ? '#BDBDBD' : '#ffffff';
    const rightTitleStyle = !!this.props.rightTitle ? {color:'#9E9E9E', fontSize: normalize(14)} : {};
    const padding = !this.props.padding ? {paddingTop:0, paddingBottom:0, paddingLeft:0, paddingRight:0, marginTop:0, marginBottom:0, marginLeft:0, marginRight:0} : {};

    return (
      <ListItem
        avatar={this.props.avatar}
        avatarStyle={avatarStyle}
        roundAvatar={true}
        leftIcon={leftIcon}
        containerStyle={[containerStyle, padding]}
        title={this.props.title}
        titleStyle={titleStyle}
        subtitle={this.props.subtitle}
        subtitleStyle={subtitleStyle}
        chevronColor={chevronColor}
        rightTitle={this.props.rightTitle}
        rightTitleStyle={rightTitleStyle}
        onPress={this.props.onPress}
        hideChevron={this.props.hideChevron}
        underlayColor={Colors.underlayColor}
      >
      </ListItem>
    );
  }
}