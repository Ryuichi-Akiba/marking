import React from 'react'
import {View} from 'react-native'
import {List, ListItem, normalize} from 'react-native-elements'
import Colors from '../../themes/Colors'

export default class ListGroup extends React.PureComponent {
  static propTypes = {
    margin: React.PropTypes.bool,
    border: React.PropTypes.bool,
    borderTop: React.PropTypes.bool,
    borderBottom: React.PropTypes.bool,
    title: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    margin: true,
    border: true,
    borderTop: true,
    borderBottom: true,
    backgroundColor: Colors.backgroundColor,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const border = !this.props.border ? {borderTopWidth:0, borderBottomWidth:0} : !!this.props.title ? {borderTopWidth:0, borderBottomWidth:0.5} :  {borderTopWidth:0.5, borderBottomWidth:0.5};
    const borderTop = !this.props.borderTop ? {borderTopWidth:0} : {};
    const borderBottom = !this.props.borderBottom ? {borderBottomWidth:0} : {};
    const title = <ListItem title={this.props.title} hideChevron={true} titleStyle={{fontSize:normalize(12), color:Colors.gray, marginLeft:5}} containerStyle={{backgroundColor:this.props.backgroundColor, borderBottomWidth:0.5, borderBottomColor:Colors.borderColor}}/>;
    const marginTop = !this.props.margin ? 0 : !!this.props.title ? 12 : 32;

    if (this.props.title) {
      return (
        <List containerStyle={[{borderColor:Colors.borderColor, marginTop:marginTop}, border, borderTop, borderBottom, this.props.style]}>
          {title}
          {this.props.children}
        </List>
      );
    } else {
      return (
        <List containerStyle={[{borderColor:Colors.borderColor, marginTop:marginTop}, border, borderTop, borderBottom, this.props.style]}>
          {this.props.children}
        </List>
      );
    }
  }
}