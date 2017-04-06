import React from 'react'
import {ScrollView} from 'react-native'

export default class ScrollViewContainer extends React.PureComponent {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={{flex:1, backgroundColor:'#EEEEEE'}}>
        {this.props.children}
      </ScrollView>
    );
  }
}