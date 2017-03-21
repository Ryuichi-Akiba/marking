import React from 'react'
import {View} from 'react-native'
import ValueListView from '../components/common/ValueListView'
import MarkingNavbar from '../components/common/MarkingNavbar'

export default class SelectableListViewScene extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
  };

  render() {
    // キャンセル処理をハンドルする
    const handleCancel = {
      title: 'Cancel',
      handler: () => this.props.navigator.pop()
    };

    // 画面をレンダリングする
    return (
      <View>
        <MarkingNavbar title="選択する" left={handleCancel}/>
        <ValueListView data={this.props.data} onSelect={this.props.onSelect}/>
      </View>
    );
  }
}
