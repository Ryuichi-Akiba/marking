import React from 'react'
import {View, TouchableOpacity, TouchableHighlight, ListView, Text} from 'react-native'

export default class ValueListView extends React.PureComponent {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data)
    }
  }

  renderRow(rowData, sectionID, rowID) {
    const handlePress = () => {
      if (!!this.props.onClick) {
        this.props.onClick(rowData, sectionID, rowID);
      }
    };

    return (
      <TouchableHighlight underlayColor={'#f6f6f6'} onPress={handlePress}>
        <View>
          <Text>{rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}
