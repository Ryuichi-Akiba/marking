import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import Label from '../elements/Label'
import Colors from '../../themes/Colors'

const styles = StyleSheet.create({
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 2
      }
    })
  },
});

// スタイルを共通化したラベルコンポーネント
export default class Icon extends React.PureComponent {
  static propTypes = {
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    source: React.PropTypes.any,
    component: React.PropTypes.object,
    size: React.PropTypes.arrayOf(['large', 'middle', 'small']),
    fullSize: React.PropTypes.bool,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    circle: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    color: Colors.text,
  };

  constructor(props) {
    super(props);
  }

  renderTitle() {
    if (!this.props.title) {
      return null;
    }
    return <Label color={this.props.color} size="small" bold={true}>{this.props.title}</Label>;
  }

  render() {
    var width = null;
    var outline = this.props.size === 'large' ? 88 : this.props.size === 'small' ? 48 : 72;
    if (this.props.fullSize) {
      width = outline;
    } else {
      width = this.props.size === 'large' ? 40 : this.props.size === 'small' ? 24 : 24;
    }

    const circle = this.props.circle ? {width:width, height:width, borderRadius:width / 2} : {width:width, height:width};
    var icon = null;
    if (this.props.component) {
      icon = this.props.component;
    } else if (this.props.source) {
      icon = <Image source={this.props.source} style={circle} {...this.props}/>;
    } else {
      icon = (<MAIcon name={this.props.name} size={width} color={this.props.color}/>);
    }

    const style = this.props.circle ? {width:outline, height:outline, borderRadius:outline / 2} : {width:outline, height:outline};
    const background = this.props.backgroundColor ? {backgroundColor:this.props.backgroundColor} : {backgroundColor:Colors.white};
    const raised = this.props.raised ? styles.raised : {};
    const checked = this.props.checked ? <MAIcon name="check-circle" size={20} color={Colors.green} style={{position:'absolute', top:0, right:0, backgroundColor:Colors.transparent}}/> : null;
    if (this.props.onPress) {
      return (
        <TouchableOpacity style={[background, style, raised, {alignItems:'center', justifyContent:'center'}]} onPress={this.props.onPress} {...this.props}>
          {icon}
          {this.renderTitle()}
          {checked}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[background, style, raised, {alignItems:'center', justifyContent:'center'}]} {...this.props}>
          {icon}
          {this.renderTitle()}
          {checked}
        </View>
      );
    }
  }
}