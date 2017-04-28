import React from 'react'
import {ScrollView} from 'react-native'
import Colors from '../../themes/Colors'

export default class ScrollViewContainer extends React.PureComponent {
  static propTypes = {
    style: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={[{flex:1, backgroundColor:Colors.backgroundColor}, this.props.style]} {...this.props}>
        {this.props.children}
      </ScrollView>
    );
  }
}