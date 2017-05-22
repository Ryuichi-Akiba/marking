import React from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Animated, Image, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import MarkingNavbar from '../components/common/MarkingNavbar'
import Icon from '../components/elements/Icon'
import Label from '../components/elements/Label'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import PetImage from '../components/pets/PetImage'
import Stopwatch from '../components/elements/Stopwatch'
import Colors from '../themes/Colors'
import * as markingMapActions from '../redux/reducers/walking'
import * as rootActions from '../redux/reducers/root'

class WalkingScene extends React.PureComponent {
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

    this.peeAnimatedValue = [];
    this.pooAnimatedValue = [];
    this.state = {
      recording: false, // 散歩記録中はTRUEになる
      selectedIndex: 0, // 選択中のペットのインデックス番号
      selected: {}, // 選択中のペットの情報
    };
  }

  componentDidMount() {
    // どのページからも呼ばれるため、ルートにあるローディングを常時OFFにして始める
    this.props.rootActions.destroyLoadingScene();
  }

  componentWillMount() {
    const {state, actions} = this.props;
    actions.getCurrentLocation();
    actions.initWatchId();

    // 前の画面で選択したペットの１匹目を選択中の状態にする
    this.setState({selected:this.props.walkingState.pets[0]});
  }

  componentWillUnmount() {
    const {state, actions} = this.props;
    actions.clearLocationWatch({watchId: state.watchId})
  }

  // 散歩の開始/終了のコントロール
  handleMarking(isStarted) {
    const {actions, state} = this.props;
    this.setState({recording:true}); // このシーンのステートを記録中にする

    const value = isStarted ? 1 : 0;
    Animated.spring(state.visibility, {toValue: value}).start();

    if (isStarted) {
      actions.startMarking(state.markings);
    } else {
      this.setState({visiblePee:false, visiblePoo:false, recording:false});
      actions.finishMarking(state.markings);
    }
  }

  cancelRecording() {
    this.setState({recording:false});
    // TODO キャンセルするActionを用意しないといけないが、どうすれば良いかわからない
  }

  // 散歩の開始終了ボタンを描画する
  renderStartButton() {
    var icon = null;
    if (!this.state.recording) {
      icon =  <Icon name="play-arrow" title="START" circle={true} color={Colors.white} backgroundColor={Colors.orange} size="large" onPress={() => this.handleMarking(!this.state.recording)}/>;
    } else {
      icon =  <Icon name="stop" title="FINISH" circle={true} color={Colors.orange} backgroundColor={Colors.backgroundColor} size="large" onPress={() => this.handleMarking(!this.state.recording)}/>;
    }
    var watch = <Stopwatch/>;

    return (
      <View style={{flex:1, alignItems:'center'}}>
        {icon}
      </View>
    );
  }

  // うんちボタンを描画する
  renderPooButton(pet) {
    const handlePoo = () => {
      // TODO マーカーを配置する処理を追加する
      const markings = this.props.walkingState.markings;
      if (pet && pet.id) this.props.walkingActions.poo(markings, pet.id);
    };

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
        <Icon name="cloud" title="Poo" color={Colors.white} circle={true} backgroundColor={Colors.amber} onPress={handlePoo}/>
      </View>
    );
  }

  // おしっこボタンを描画する
  renderPeeButton(pet) {
    const handlePee = () => {
      // TODO マーカーを配置する処理を追加する
      const markings = this.props.walkingState.markings;
      if (pet && pet.id) this.props.walkingActions.pee(markings, pet.id);
    };

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
        <Icon name="opacity" title="Pee" color={Colors.white} circle={true} backgroundColor={Colors.lightBlue} onPress={handlePee}/>
      </View>
    );
  }

  // 選択中のペットの情報を表示するエリアをレンダリングする
  renderPetView() {
    console.log(this.state.selected);
    const pet = this.state.selected;
    const index = this.state.selectedIndex;
    const pets = this.props.walkingState.pets;

    let handleNext = (i) => {
      if (i < 0) i = pets.length - 1; // 無限ループにしたいので
      if (pets.length <= i) i = 0; // 無限ループにしたいので
      this.setState({selected: pets[i], selectedIndex: i});
    };

    // TODO スワイプで選択中のペットが変えられるようにすること
    return (
      <View style={{alignItems:'center'}}>
        <View>
          <Label size="large" bold={true} color={Colors.gray} numberOfLines={1}>{pet.name}</Label>
        </View>
        <View style={{flex:1, flexDirection:'row', }}>
          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={() => handleNext(index - 1)}>
            <MAIcon name="chevron-left" size={32} color={Colors.gray}/>
          </TouchableOpacity>
          <PetImage style={{flex:1}} source={{uri:pet.image}} name={pet.name}/>
          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={() => handleNext(index + 1)}>
            <MAIcon name="chevron-right" size={32} color={Colors.gray}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {state, actions} = this.props;

    const left = {icon:'clear', handler:() => {
      Alert.alert('お散歩をやめますか？', '記録しないでお散歩をやめます。お散歩をやめる場合は、OKを押します。', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          // TODO キャンセル処理をActionに記述してそれを呼び出す
          this.props.navigator.replace({name:'WalkingSelectScene'});
        }},
      ]);
    }};
    // 記録中は右上にキャンセルボタンを表示して、記録を中断できるようにする
    var right = null;
    if (this.state.recording) {
      right = {icon:'clear', handler:this.cancelRecording.bind(this)};
    }

    const pet = this.state.selected;
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <MarkingNavbar title="お散歩" left={left} right={right}/>
          <MapView style={{flex:1}} showsUserLocation={true} showsCompass={true} followsUserLocation={true} region={state.region} onRegionChange={actions.updateCurrentLocation}/>
          <ScrollView style={{flex:1, paddingTop:24}}>
            {this.renderPetView()}
          </ScrollView>
          <View style={styles.buttonContainer}>
            {this.renderPooButton(pet)}
            {/*{this.renderStartButton()}*/}
            {this.renderPeeButton(pet)}
          </View>
        </View>
    );
  }
}

const SIZE = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // メインのボタン定義（スタート、終了ボタン）
  mainCircleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom:16,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  button: {
    // width: 100,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 25,
  },
  picture: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    marginHorizontal: 5,
    backgroundColor: 'skyblue',
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 2
      }
    })
  },
});

function mapStateToProps(state) {
  return {
    state: state.walking,
    walkingState: state.walking,
    rootState: state.root,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markingMapActions), dispatch),
    walkingActions: bindActionCreators(Object.assign({}, markingMapActions), dispatch),
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalkingScene);
