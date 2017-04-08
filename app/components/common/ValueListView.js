import React from 'react'
import {View, ScrollView, TouchableOpacity, TouchableHighlight, ListView, Text, StyleSheet} from 'react-native'
import List from '../elements/List'

export default class ValueListView extends React.PureComponent {
  static propTypes = {
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    converter: React.PropTypes.func,
  };

  static defaultProps = {
    converter: (rowData) => {
      if (rowData) {
        return rowData;
      }
      return '';
    }
  };

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 || r1.id !== r2.id,
    });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
      });
    }
  }

  renderRow(rowData, sectionID, rowID) {
    const handlePress = () => {
      if (!!this.props.onSelect) {
        this.props.onSelect(rowData, sectionID, rowID);
      }
    };

    return (
      <TouchableHighlight underlayColor={'#f6f6f6'} onPress={handlePress}>
        <View>
          <List key={rowID} title={this.props.converter(rowData)}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView>
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </ScrollView>
    );
  }
}
