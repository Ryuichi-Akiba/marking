import React from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Animated, Image, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import MarkingNavbar from '../components/common/MarkingNavbar'
import Icon from '../components/elements/Icon'
import Label from '../components/elements/Label'
import Stopwatch from '../components/elements/Stopwatch'
import Colors from '../themes/Colors'
import * as markingMapActions from '../redux/reducers/markingMap'
import * as rootActions from '../redux/reducers/root'

class MarkingMap extends React.PureComponent {
  static propTypes = {
    // map from root
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from react-redux
    state: React.PropTypes.object,
    actions: React.PropTypes.object,
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.peeAnimatedValue = [];
    this.pooAnimatedValue = [];
    this.state = {
      recording: false, // 散歩記録中はTRUEになる
      visiblePoo: false, // うんちしたペットを選択する時はTRUEになる
      visiblePee: false, // おしっこしたペットを選択する時はTRUEになる
      selected: [], // 選択したペット
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
    actions.showMyPets();

    state.pets.forEach((pet) => {
      this.peeAnimatedValue[pet.id] = new Animated.Value(0);
      this.pooAnimatedValue[pet.id] = new Animated.Value(0);
    });

    this.peeAnimate();
    this.pooAnimate();
  }

  componentWillUnmount() {
    const {state, actions} = this.props;

    actions.clearLocationWatch({watchId: state.watchId})
  }

  componentWillReceiveProps(nextProps) {
    // 基本的には初回のみ呼び出されるはずだが、飼育しているペットを全て選択済みの状態にする
    if (this.props.state.pets !== nextProps.state.pets) {
      this.setState({selected:nextProps.state.pets});
    }
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

  pee(petId) {
    const {state, actions} = this.props;

    console.log('peeしたペットは:' + petId);

    actions.pee(state.markings, petId);
  }

  poo(petId) {
    const {state, actions} = this.props;

    console.log('pooしたペットは:' + petId);

    actions.poo(state.markings, petId);
  }

  peeAnimate() {
    const animations = this.props.state.pets.map((pet) => {
      return Animated.timing(
          this.peeAnimatedValue[pet.id],
          {
            toValue: 1,
            duration: 50,
          }
      );
    });
    Animated.sequence(animations).start();
  }

  pooAnimate() {
    const animations = this.props.state.pets.map((pet) => {
      return Animated.timing(
          this.pooAnimatedValue[pet.id],
          {
            toValue: 1,
            duration: 50,
          }
      );
    });
    Animated.sequence(animations).start();
  }

  cancelRecording() {
    this.setState({recording:false});
    // TODO キャンセルするActionを用意しないといけないが、どうすれば良いかわからない
  }

  // 散歩の開始終了ボタンを描画する
  renderStartButton() {
    // TODO 画面描画に必要なPropsはStateに移動すること
    const {state, actions} = this.props;
    // if (!this.state.recording) {
    if (!state.isStarted) {
      const style = [styles.mainCircleButton, styles.raised, {backgroundColor:Colors.deepOrange}];
      return (
        <View style={{flex:1, alignItems:'center'}}>
          <TouchableOpacity style={style} onPress={() => this.handleMarking(!state.isStarted)}>
            <MAIcon name="play-arrow" size={32} color={Colors.white} style={{marginBottom:1}}/>
            <Label color={Colors.white} size="small">START</Label>
          </TouchableOpacity>
        </View>
      );
    } else {
      const style = [styles.mainCircleButton, styles.raised, {backgroundColor:Colors.underlayColor}];
      return (
        <View style={{flex:1, alignItems:'center'}}>
          <TouchableOpacity style={style} onPress={() => this.handleMarking(!state.isStarted)}>
            <MAIcon name="stop" size={32} color={Colors.deepOrange} style={{marginBottom:1}}/>
            <Label color={Colors.deepOrange} size="small">FINISH</Label>
          </TouchableOpacity>
          <Stopwatch/>
        </View>
      );
    }
  }

  // うんちボタンを描画する
  renderPooButton() {
    const {state} = this.props;
    const bottom = state.visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    const pooAnimations = this.state.visiblePoo ?
      this.state.selected.map((pet, i) => {
        return (
          <Animated.View key={i} style={{opacity: this.pooAnimatedValue[pet.id], marginVertical: 5}}>
            <Icon source={{uri:pet.image}} raised={true} circle={true} fullSize={true} onPress={() => this.poo(pet.id)}/>
          </Animated.View>
        )
      }) : () => {return (<View/>)};

    const handlePressPoo = () => {
      // 選択したペット(散歩に連れていくペット)が１匹だけの場合はペット選択用アイコンを表示しない
      if (this.state.selected.length === 1) {
        this.poo(this.state.selected[0].id);
      } else {
        this.setState({visiblePoo: !this.state.visiblePoo});
      }
    };

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
        {/* うんちするペットボタン */}
        {pooAnimations}
        {/* うんちボタン */}
        <Animated.View style={{bottom}}>
          <Icon source={require('./images/icon/poo.png')} raised={true} circle={true} backgroundColor={Colors.amber} onPress={handlePressPoo}/>
        </Animated.View>
      </View>
    );
  }

  // おしっこボタンを描画する
  renderPeeButton() {
    const {state} = this.props;
    const bottom = state.visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    const peeAnimations = this.state.visiblePee ?
      this.state.selected.map((pet, i) => {
        return (
          <Animated.View key={i} style={{opacity: this.peeAnimatedValue[pet.id], marginVertical: 5}}>
            <Icon source={{uri:pet.image}} raised={true} circle={true} fullSize={true} onPress={() => this.pee(pet.id)}/>
          </Animated.View>
        )
      }) : () => {return (<View/>)};

    const handlePressPee = () => {
      // 選択したペット(散歩に連れていくペット)が１匹だけの場合はペット選択用アイコンを表示しない
      if (this.state.selected.length === 1) {
        this.pee(this.state.selected[0].id);
      }else {
        this.setState({visiblePee: !this.state.visiblePee});
      }
    };
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
        {/* おしっこするペットボタン */}
        {peeAnimations}
        {/* おしっこボタン */}
        <Animated.View style={{bottom}}>
          <Icon name="opacity" raised={true} circle={true} backgroundColor={Colors.lightBlue} onPress={handlePressPee}/>
        </Animated.View>
      </View>
    );
  }

  // 飼育しているペットが散歩対象としてチェックされているか確認する
  isChecked(pet) {
    const exists = this.state.selected.filter((select) => select.id === pet.id);
    return !!exists && exists.length !== 0;
  }

  // 飼育しているペットを散歩に連れていく（もしくは、連れて行かない）か選択する
  selectPet(pet) {
    var selected = [].concat(this.state.selected);
    if (this.isChecked(pet)) {
      var index = 0;
      selected.forEach((select, i) => {
        if (pet.id === select.id) {
          index = i;
        }
      });
      selected.splice(index, 1);
    } else {
      selected.push(pet);
    }
    this.setState({selected});
  }

  render() {
    const {state, actions} = this.props;

    const left = {icon:'menu', handler:this.props.openMenu};
    // 記録中は右上にキャンセルボタンを表示して、記録を中断できるようにする
    var right = null;
    if (this.state.recording) {
      right = {icon:'clear', handler:this.cancelRecording.bind(this)};
    }

    const pets = [];
    state.pets.forEach((pet, i) => {
      const handleSelect = () => this.selectPet(pet);
      const checked = this.isChecked(pet);
      var icon = null;
      if (pet.image) {
        icon = <Icon source={{uri:pet.image}} raised={true} circle={true} fullSize={true} checked={checked} onPress={handleSelect}/>;
      } else {
        icon = <Icon name="pets" raised={true} circle={true} backgroundColor={Colors.white} color={Colors.gray} checked={checked} onPress={handleSelect}/>;
      }
      pets.push(<View key={i} style={{margin:2}}>{icon}</View>);
    });

    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <MarkingNavbar title="散歩マップ" left={left} right={right}/>
          <View style={styles.container}>

            {/* 散歩の地図 */}
            <MapView
                style={styles.map}
                showsUserLocation={true}
                region={state.region}
                onRegionChange={actions.updateCurrentLocation}
            />

            {/* ペットのアイコン */}
            <ScrollView horizontal={true} style={styles.iconContainer}>
              {pets}
            </ScrollView>

            <View style={styles.buttonContainer}>
              {this.renderPooButton()}
              {this.renderStartButton()}
              {this.renderPeeButton()}
            </View>
          </View>
        </View>
    );
  }
}

const SIZE = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  iconContainer: {
    position: 'absolute',
    top:8,
    right:8,
    left:8,
    backgroundColor: 'transparent',
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
    state: state.markingMap,
    rootState: state.root,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markingMapActions), dispatch),
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkingMap);
