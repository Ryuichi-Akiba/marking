import React from 'react'
import {List} from 'react-native-elements'

export default class ListGroup extends React.PureComponent {
  static propTypes = {
    margin: React.PropTypes.bool,
    border: React.PropTypes.bool,
  };
  static defaultProps = {
    margin: true,
    border: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const border = !!this.props.border ? {borderTopWidth:0.5, borderBottomWidth:0.5} : {borderTopWidth:0, borderBottomWidth:0};

    if (this.props.margin) {
      return (
        <List containerStyle={[{borderColor:'#E0E0E0', marginTop:32}, border]}>
          {this.props.children}
        </List>
      );
    } else {
      return (
        <List containerStyle={[{borderColor:'#E0E0E0', marginTop:0}, border]}>
          {this.props.children}
        </List>
      );
    }
  }
}