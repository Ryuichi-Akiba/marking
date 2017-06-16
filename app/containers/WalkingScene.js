import moment from 'moment'
import React from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Animated, Image, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import MarkingNavbar from '../components/common/MarkingNavbar'
import Icon from '../components/elements/Icon'
import Label from '../components/elements/Label'
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
    this.state = {
      // markers: [], // 散歩中に配置するマーカー
      recording: false, // 散歩記録中はTRUEになる
      selectedIndex: 0, // 選択中のペットのインデックス番号
      pooIcon: {}, // ImageSource形式のPOOアイコン
      peeIcon: {}, // ImageSource形式のPEEアイコン
    };
  }

  componentWillMount() {
    const {state, actions} = this.props;
    actions.getCurrentLocation();
    actions.initWatchId();

    // 前の画面で選択したペットの１匹目を選択中の状態にする
    this.setState({selectedIndex:0});
    // 地図に描画するアイコンはImageSourceじゃないといけないので、後で使えるようにステートにロードしておく
    MAIcon.getImageSource('cloud', 24, Colors.amber).then((source) => this.setState({pooIcon:source}));
    MAIcon.getImageSource('opacity', 24, Colors.blue).then((source) => this.setState({peeIcon:source}));
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

  // うんちボタンを描画する
  renderPooButton(pet) {
    const handlePoo = () => {
      if (pet && pet.id) {
        const latlng = this.props.walkingState.region;
        this.props.walkingActions.addMarker({coordinate:latlng, pet:pet, time:moment(), type:'POO', title:pet.name + 'のPOO', description:''});
      }
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
      if (pet && pet.id) {
        const latlng = this.props.walkingState.region;
        this.props.walkingActions.addMarker({coordinate:latlng, pet:pet, time:moment(), type:'PEE', title:pet.name + 'のPEE', description:''});
      }
    };

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
        <Icon name="opacity" title="Pee" color={Colors.white} circle={true} backgroundColor={Colors.lightBlue} onPress={handlePee}/>
      </View>
    );
  }

  // 選択中のペットの情報を表示するエリアをレンダリングする
  renderPetView() {
    const index = this.state.selectedIndex;
    const pets = this.props.walkingState.pets;
    const pet = pets[index];

    let handleNext = (i) => {
      if (i < 0) i = pets.length - 1; // 無限ループにしたいので
      if (pets.length <= i) i = 0; // 無限ループにしたいので
      this.setState({selectedIndex: i});
    };

    // TODO スワイプで選択中のペットが変えられるようにすること
    return (
      <ScrollView style={{flex:1, paddingTop:24}}>
        <View style={{alignItems:'center'}}>
          <Label size="large" bold={true} color={Colors.gray} numberOfLines={1}>{pet.name}</Label>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={() => handleNext(index - 1)}>
            <MAIcon name="chevron-left" size={32} color={Colors.gray}/>
          </TouchableOpacity>
          <PetImage style={{flex:1}} source={{uri:pet.image}} name={pet.name}/>
          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}} onPress={() => handleNext(index + 1)}>
            <MAIcon name="chevron-right" size={32} color={Colors.gray}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  renderMapView() {
    var markers = this.props.walkingState.markers.map((marker, index) => {
      var image = null;
      if (marker.type === 'POO') {
        image = this.state.pooIcon;
      } else if (marker.type === 'PEE') {
        image = this.state.peeIcon;
      }
      return (
        <MapView.Marker
          key={index}
          image={image}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      );
    });

    return (
      <MapView ref={(ref) => {this.map = ref;}}
               style={{flex:1}}
               showsUserLocation={true}
               showsCompass={true}
               followsUserLocation={true}
               region={this.props.walkingState.region}
               onRegionChange={this.props.walkingActions.updateCurrentLocation}>
        {markers}
      </MapView>
    );
  }

  render() {
    // 左側ボタン
    const left =  {icon:'clear', handler:() => {
      Alert.alert('お散歩をやめますか？', '記録しないでお散歩をやめます。お散歩をやめる場合は、OKを押します。', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.props.walkingActions.cancelWalking();
          this.props.navigator.replace({name:'WalkingSelectScene'});
        }},
      ]);
    }};

    // 右側ボタン
    const right = {title:'おわる', handler:() => {
      // TODO 移動距離をどうやって算出するか？？
      this.props.walkingActions.endWalking({endDateTime:moment(), distance:0});
      this.props.navigator.replace({name:'WalkingCompleteScene'});
    }};

    const pet = this.props.walkingState.pets[this.state.selectedIndex];
    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <MarkingNavbar title="お散歩" left={left} right={right}/>
          {this.renderMapView()}
          {this.renderPetView()}
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
