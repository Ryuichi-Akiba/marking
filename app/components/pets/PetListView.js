import React from 'react'
import {View, TouchableOpacity, TouchableHighlight, ListView, Text} from 'react-native'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux';

export default class PetListView extends React.PureComponent {
  static propTypes = {
    pets: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.pets)
    }
  }

  renderRow(rowData, sectionID, rowID) {
    const handlePress = () => {
      if (!!this.props.onClick) {
        this.props.onClick(rowID, rowData);
      }
    };

    return (
      <TouchableHighlight underlayColor={'#f6f6f6'} onPress={handlePress}>
        <View>
          <Text>{rowData.id}, </Text>
          <Text>{rowData.name}</Text>
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
