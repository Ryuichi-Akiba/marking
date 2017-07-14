import React from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import moment from 'moment'
import {Button} from 'react-native-elements'
import MarkingNavbar from '../components/common/MarkingNavbar'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import Label from '../components/elements/Label'
import Colors from '../themes/Colors'
import * as walkingActions from '../redux/reducers/walking'
import * as rootActions from '../redux/reducers/root'

class WalkingCompleteScene extends React.PureComponent {
  static propTypes = {
    // map from root
    navigator: React.PropTypes.object.isRequired,
    // map from react-redux
    walkingState: React.PropTypes.object,
    walkingActions: React.PropTypes.object,
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    // データの保存が完了してから画面遷移する
    if (this.props.walkingState.completed !== newProps.walkingState.completed) {
      if (!!newProps.walkingState.completed) {
        // 画面ブロックを解除して画面遷移する
        this.props.rootActions.unblockScene();
        this.props.navigator.replace({name:'HomeScene', props:{message:'今日の散歩情報を保存しました。'}});
      }
    }
  }

  renderMarkingList() {
    // 全てのペットに共通パラメータを計算する
    var distance = this.props.walkingState.distance;
    var time = this.props.walkingState.endDateTime.diff(this.props.walkingState.startDateTime, 'minutes');

    // ペットごとにうんち等の情報をサマリする
    var list = new Array();
    this.props.walkingState.pets.forEach((p, i) => {
      var pee = 0;
      var poo = 0;
      this.props.walkingState.markers.forEach((m) => {
        if (m.pet.id === p.id) {
          if (m.type === 'POO') poo++;
          if (m.type === 'PEE') pee++;
        }
      });
      list.push(
        <ListGroup key={i} title={p.name + 'の記録'}>
          <List icon="cloud" iconColor={Colors.amber} title="うんち" subtitle={poo + ' 回'}/>
          <List icon="opacity" iconColor={Colors.lightBlue} title="おしっこ" subtitle={pee + ' 回'}/>
          <List icon="directions-walk" iconColor={Colors.lightGreen} title="移動距離・時間" subtitle={distance + ' m / ' + time + ' 分'} border={false}/>
        </ListGroup>
      );
    });
    return list;
  }

  // 画面をレンダリングする
  render() {
    // 散歩画面に戻る
    const left = {icon:'arrow-back', handler:() => {
      this.props.navigator.replace({name:'WalkingScene'})
    }};

    // ボタンを表示して、お散歩情報を保存する
    const right = {title:'保存', handler:() => {
      // 画面ブロックを解除して登録処理する
      this.props.rootActions.blockScene();
      this.props.walkingActions.save(this.props.walkingState);
    }};

    // まとめ画面を描画する
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <MarkingNavbar title="お散歩まとめ" left={left} right={right}/>
          <ScrollView style={{flex:1, backgroundColor:Colors.backgroundColor}}>
            {this.renderMarkingList()}
          </ScrollView>
        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    walkingState: state.walking,
    rootState: state.root,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    walkingActions: bindActionCreators(Object.assign({}, walkingActions), dispatch),
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalkingCompleteScene);
