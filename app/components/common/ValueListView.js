import React from 'react'
import {View, ScrollView, TouchableOpacity, TouchableHighlight, ListView, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  cell: {
    padding: 15,
    paddingLeft: 0,
    marginLeft: 15,
    borderColor: '#cccccc',
    borderBottomWidth: 0.5,
  },
});

export default class ValueListView extends React.PureComponent {
  static propTypes = {
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
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
        <View style={styles.cell}>
          <Text>{rowData}</Text>
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
