import React from 'react'
import {View} from 'react-native'
import ValueListView from '../common/ValueListView'
import MarkingNavbar from '../common/MarkingNavbar'
import NavbarIcon from '../common/NavbarIcon'

export default class SelectableListViewScene extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
  };

  render() {
    // キャンセル処理をハンドルする
    const handleCancel = <NavbarIcon icon="clear" onPress={() => this.props.navigator.pop()}/>;
    const handleSelect = (value) => {
      this.props.onSelect(value);
      this.props.navigator.pop();
    };

    // 画面をレンダリングする
    return (
      <View>
        <MarkingNavbar title="選択する" left={handleCancel}/>
        <ValueListView data={this.props.data} onSelect={handleSelect}/>
      </View>
    );
  }
}
