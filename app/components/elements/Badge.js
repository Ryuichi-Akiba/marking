import React from 'react'
import {View, TouchableHighlight} from 'react-native'
import {Text, normalize} from 'react-native-elements'
import Colors from '../../themes/Colors'

// バッジコンポーネント
export default class Badge extends React.PureComponent {
  static propTypes = {
    color: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  wrap(component) {
    if (!!this.props.disabled) {
      return component;
    }
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor={Colors.white}>
        {component}
      </TouchableHighlight>
    );
  }

  render() {
    const fontColor = !!this.props.disabled ? Colors.gray : !!this.props.active ? Colors.white : Colors.text;
    const backgroundColor = !!this.props.disabled ? Colors.white : !!this.props.active ? Colors.orange : !!this.props.color ? this.props.color : Colors.backgroundColor;

    return this.wrap(
      <View style={{backgroundColor:backgroundColor, width:32, height:32, borderRadius:16, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:normalize(14), color:fontColor}} {...this.props}>{this.props.children}</Text>
      </View>
    );
  }
}