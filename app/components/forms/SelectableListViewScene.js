import React from 'react'
import {View, ScrollView} from 'react-native'
import {SearchBar} from 'react-native-elements'
import ScrollViewContainer from '../common/ScrollViewContainer'
import List from '../elements/List'
import ListGroup from '../elements/ListGroup'
import MarkingNavbar from '../common/MarkingNavbar'
import Colors from '../../themes/Colors'

export default class SelectableListViewScene extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    converter: React.PropTypes.func,
    search: React.PropTypes.bool,
  };

  static defaultProps = {
    converter: (value) => value,
  };

  constructor(props) {
    super(props);

    var list = this.filter(props.data, '');
    this.state = {list};
  }

  filter(data, keyword) {
    if (!keyword) {
      keyword = '';
    }

    var list = [];
    data
      .filter((value) => {
        const v = this.props.converter(value);
        return v.indexOf(keyword) !== -1;
      })
      .forEach((value, i) => {
        const handle = () => {
          this.props.onSelect(value);
          this.props.navigator.pop();
        };
        list.push(<List key={i} title={this.props.converter(value)} onPress={handle}/>);
      });
    return list;
  }

  renderSearchBar() {
    console.log(this.props.search);
    if (!this.props.search) {
      return null;
    }

    const handleSearch = (keyword) => {
      const list = this.filter(this.props.data, keyword);
      this.setState({list});
    };
    return (
      <SearchBar round lightTheme onChangeText={handleSearch} placeholder='検索'/>
    );
  }

  render() {
    // キャンセル処理をハンドルする
    const handleCancel = {icon:'clear', handler:this.props.navigator.pop};

    // 画面をレンダリングする
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <MarkingNavbar title="選択する" left={handleCancel}/>
        {this.renderSearchBar()}
        <ScrollView>
          {this.state.list}
        </ScrollView>
      </View>
    );
  }
}
