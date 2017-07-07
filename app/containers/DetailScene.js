import React from 'react'
import {Navigator, StyleSheet, View, ScrollView, Image, TouchableHighlight, Dimensions, Alert, Text} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Tabs, Tab} from 'react-native-elements'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import * as rootActions from '../redux/reducers/root'
import * as petDetailActions from '../redux/reducers/detail'
import DetailHistoryView from './views/DetailHistoryView'
import DetailAnalyticsView from './views/DetailAnalyticsView'
import DetailMarkingView from './views/DetailMarkingView'
import DetailOtherView from './views/DetailOtherView'
import Colors from '../themes/Colors'

const window = Dimensions.get('window');

class DetailScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator:     React.PropTypes.object.isRequired,
    // map from other scene
    pet:           React.PropTypes.object.isRequired,
    initial:       React.PropTypes.string, // 初期表示するビュー名
    // map from react-redux
    rootState:     React.PropTypes.object,
    rootActions:   React.PropTypes.object,
    detailState:   React.PropTypes.object,
    detailActions: React.PropTypes.object,
  };

  static defaultProps = {
    // 初期表示ビューは履歴画面にしておく
    initial: 'history',
  };

  constructor(props) {
    super(props);
    this.state = {selected:this.props.initial, pet:props.pet, markers:[], distance:0, poo:0, pee:0};
  };

  /**
   * 初回ロード時に呼び出され、ペットのマーキング情報を取得する
   */
  componentDidMount() {
    // 初期表示のタブ（ヘルスケアのビュー）に表示するデータを取得する
    this.reload(this.props.pet, new Date());
  }

  /**
   * コンポーネントのPropsが変更された時に呼び出される処理の定義
   * @param newProps 新しいプロパティ
   */
  componentWillReceiveProps(newProps) {
    // アーカイブ処理された場合にトースターを表示する待ち受け処理
    if (this.props.detailState.archived !== newProps.detailState.archived) {
      if (newProps.detailState.archived) {
        this.props.detailActions.clear(); // ステートを元の状態に戻す
        this.props.navigator.replace({name:'HomeScene', props:{message: newProps.pet.name + 'をアーカイブしました。'}});
      }
    }

    // 散歩情報の取得に成功した時にブロックを解除する待ち受け処理
    if (this.props.detailState.successGetWalkings !== newProps.detailState.successGetWalkings) {
      if (newProps.detailState.successGetWalkings) {
        this.props.detailActions.clear(); // ステートを元の状態に戻す
        this.props.rootActions.unblockScene();
      }
    }
  }

  reload(pet, date) {
    this.props.rootActions.blockScene();
    this.props.detailActions.initialize({pet, date});
  }

  changeTab (selected) {
    this.setState({selected})
  }

  renderTab(key: string, title: string, icon: string, component: object) {
    return (
      <Tab
        titleStyle={{fontWeight:'bold', fontSize:10, marginTop:0, marginBottom:5}}
        selected={this.state.selected === key}
        selectedTitleStyle={{color:Colors.primary}}
        title={title}
        renderIcon={() => <MAIcon style={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={Colors.gray} name={icon} size={30} />}
        renderSelectedIcon={() => <MAIcon color={Colors.primary} name={icon} size={30} />}
        onPress={() => this.changeTab(key)}>
        {component}
      </Tab>
    );
  }

  render() {
    const {date, walkings} = this.props.detailState;
    console.log(JSON.stringify(walkings));
    return (
      <Tabs tabBarStyle={{backgroundColor:Colors.white}}>
        {this.renderTab(
          'history',
          '記録',
          'history',
          <DetailHistoryView navigator={this.props.navigator} date={date} pet={this.props.pet} walkings={walkings} onReload={this.reload.bind(this)}/>
        )}
        {this.renderTab(
          'analytics',
          '分析',
          'trending-up',
          <DetailAnalyticsView navigator={this.props.navigator} date={date} pet={this.props.pet}/>
        )}
        {this.renderTab(
          'marking',
          'マーキング',
          'bubble-chart',
          <DetailMarkingView navigator={this.props.navigator} pet={this.props.pet}/>
        )}
        {this.renderTab(
          'others',
          'その他',
          'more-horiz',
          <DetailOtherView navigator={this.props.navigator} pet={this.props.pet} actions={this.props.detailActions}/>
        )}
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    detailState: state.detail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    detailActions: bindActionCreators(Object.assign({}, petDetailActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScene);
