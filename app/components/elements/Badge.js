import React from 'react'
import {View} from 'react-native'
import {Text, normalize} from 'react-native-elements'
import Colors from '../../themes/Colors'

// バッジコンポーネント
export default class Badge extends React.PureComponent {
  static propTypes = {
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const color = !!this.props.disabled ? Colors.gray : !!this.props.active ? Colors.white : Colors.text;
    const backgroundColor = !!this.props.disabled ? Colors.white : !!this.props.active ? Colors.orange : Colors.backgroundColor;
    return (
      <View style={{backgroundColor:backgroundColor, width:32, height:32, borderRadius:16, justifyContent:'center', alignItems:'center', marginTop:8, marginBottom:8}}>
        <Text style={{fontSize:normalize(14), color:color}} {...this.props}>{this.props.children}</Text>
      </View>
    );
  }
}