import moment from 'moment'
import React from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button} from 'react-native-elements'
import MarkingNavbar from '../components/common/MarkingNavbar'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import Colors from '../themes/Colors'
import * as walkingActions from '../redux/reducers/walking'
import * as rootActions from '../redux/reducers/root'

class WalkingSelectScene extends React.PureComponent {
  static propTypes = {
    // map from root
    navigator: React.PropTypes.object.isRequired,
    // map from react-redux
    walkingState: React.PropTypes.object,
    walkingActions: React.PropTypes.object,
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    menuState: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      pets: [], // 飼育中のペット
      selected:[], // 散歩に連れて行くペット
    }
  }

  // 既に共通的に取得していたペットを自分のステートにセットする（散歩開始時にReducerのステートに移される）
  componentWillMount() {
    const pets = this.props.menuState.pets;
    this.setState({pets:pets});
    this.props.walkingActions.replacePets(pets);
  }

  // 飼育しているペットを散歩に連れていく（もしくは、連れて行かない）か選択する
  selectPet(checked, pet) {
    var selected = [].concat(this.props.walkingState.pets); // 一旦、現在選択中のペットをコピー
    if (checked) {
      selected.push(pet);
    } else {
      var index = 0;
      selected.forEach((select, i) => {
        if (pet.id === select.id) {
          index = i;
        }
      });
      selected.splice(index, 1);
    }
    this.props.walkingActions.replacePets(selected);
  }

  // 散歩開始ボタン押下時に実行するハンドラーを取得する
  getStartHandler() {
    return () => {
      if (!!this.props.walkingState.pets && this.props.walkingState.pets.length > 0) {
        // 散歩を開始するので開始日時を取得する
        this.props.walkingActions.startWalking(moment());
        // 散歩中の画面に遷移させる
        this.props.navigator.replace({name:'WalkingScene'});
      } else {
        Alert.alert('お散歩しないのですか？', '一緒にお散歩するペットを１匹以上選択して、お散歩に出かけましょう。', [
          {text: 'OK', style: 'cancel'},
        ]);
      }
    };
  }

  // 散歩に連れて行くペットの一覧を描画する
  renderPetList() {
    const pets = this.state.pets;
    var list = [];
    pets.forEach((p, i) => {
      list.push(<List key={i} avatar={{uri: p.image}} title={p.name} subtitle={p.type} border={pets.length !== i + 1} switcher={true} onChangeSwitch={(v) => this.selectPet(v, p)} toggle={true}/>);
    });

    return (
      <ListGroup title="一緒にお散歩するペット">
        {list}
      </ListGroup>
    );
  }

  // 画面をレンダリングする
  render() {
    const left = {icon:'arrow-back', handler:() => this.props.navigator.replace({name:'HomeScene'})};
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <MarkingNavbar title="お散歩準備" left={left}/>
          <ScrollView style={{flex:1, backgroundColor:Colors.backgroundColor}}>
            {this.renderPetList()}
            <View style={{marginTop:16}}>
              <Button icon={{name:'directions-walk', color:Colors.primary}} title='お散歩をはじめる' color={Colors.primary} backgroundColor={Colors.white} onPress={this.getStartHandler()} borderRadius={2} buttonStyle={{borderColor:Colors.primary, borderWidth:1}}/>
            </View>
          </ScrollView>
        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    walkingState: state.walking,
    rootState: state.root,
    menuState: state.menu,
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
)(WalkingSelectScene);
