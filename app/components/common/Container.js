import React from 'react'
import {View} from 'react-native'

export default class Container extends React.PureComponent {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.props.children}
      </View>
    );
  }
}