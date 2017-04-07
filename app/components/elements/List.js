import React from 'react'
import {StyleSheet} from 'react-native'
import {ListItem, normalize} from 'react-native-elements'

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
    title: React.PropTypes.object,
    border: React.PropTypes.bool,
    chevron: React.PropTypes.bool,
    hideChevron: React.PropTypes.bool,
    rightTitle: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const border = this.props.border === undefined || !!this.props.border ? 0.5 : 0;

    const avatarStyle = !!this.props.avatar ? {marginLeft:5, marginRight:13, width:24, height:24, borderRadius:12} : {};
    const iconColor = !!this.props.iconColor ? this.props.iconColor : '#BDBDBD';
    const leftIcon = !!this.props.icon ? {name:this.props.icon, style:[styles.icon, {color:iconColor}]} : {};
    const containerStyle = {borderBottomColor:'#E0E0E0', borderBottomWidth:border, paddingTop:8, paddingBottom:8};
    const chevronColor = !!this.props.chevron ? '#BDBDBD' : '#ffffff';
    const rightTitleStyle = !!this.props.rightTitle ? {color:'#9E9E9E', fontSize: normalize(14)} : {};

    return (
      <ListItem
        avatar={this.props.avatar}
        avatarStyle={avatarStyle}
        roundAvatar={true}
        leftIcon={leftIcon}
        title={this.props.title}
        containerStyle={containerStyle}
        chevronColor={chevronColor}
        rightTitle={this.props.rightTitle}
        rightTitleStyle={rightTitleStyle}
        onPress={this.props.onPress}
        hideChevron={this.props.hideChevron}
      >
      </ListItem>
    );
  }
}