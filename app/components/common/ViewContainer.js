import React from 'react'
import {View} from 'react-native'
import Colors from '../../themes/Colors'

export default class ViewContainer extends React.PureComponent {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:Colors.backgroundColor}}>
        {this.props.children}
      </View>
    );
  }
}