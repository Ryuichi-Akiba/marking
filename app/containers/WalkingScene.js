import moment from 'moment'
import React from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Animated, Image, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
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
      region: null, // 表示中のマップのリージョンを保持する
      message: null, // 画面に表示するメッセージ
      selectedIndex: 0, // 選択中のペットのインデックス番号
      pooIcon: {}, // ImageSource形式のPOOアイコン
      peeIcon: {}, // ImageSource形式のPEEアイコン
    };
  }

  componentWillMount() {
    // 前の画面で選択したペットの１匹目を選択中の状態にする
    this.setState({selectedIndex:0});

    // 地図に描画するアイコンはImageSourceじゃないといけないので、後で使えるようにステートにロードしておく
    MAIcon.getImageSource('cloud', 24, Colors.amber).then((source) => this.setState({pooIcon:source}));
    MAIcon.getImageSource('opacity', 24, Colors.blue).then((source) => this.setState({peeIcon:source}));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.walkingState.successAddMarker !== newProps.walkingState.successAddMarker && !!newProps.walkingState.successAddMarker) {
      this.props.rootActions.showMessage(this.state.message);
      this.props.walkingActions.clear();
    }
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

  // 散歩用の地図を描画する
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
          coordinate={marker.coordinates}
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
               region={this.state.region}
               onRegionChange={(region) => {this.setState({region});}}>
        {markers}
      </MapView>
    );
  }

  // うんちボタンを描画する
  renderPooButton(pet) {
    const handlePoo = () => {
      if (pet && pet.id) {
        // 現在地情報（coordinates）はAddMarkerした時に入るようになっている
        this.setState({message: pet.name + 'がうんちした場所をマーキングしました。'});
        this.props.walkingActions.addMarker({pet:pet, time:moment(), type:'POO', title:pet.name + '\'s POO'});
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
        // 現在地情報（coordinates）はAddMarkerした時に入るようになっている
        this.setState({message: pet.name + 'がおしっこした場所をマーキングしました。'});
        this.props.walkingActions.addMarker({pet:pet, time:moment(), type:'PEE', title:pet.name + '\'s PEE'});
      }
    };

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'flex-end'}}>
        <Icon name="opacity" title="Pee" color={Colors.white} circle={true} backgroundColor={Colors.lightBlue} onPress={handlePee}/>
      </View>
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
          <View style={{position:'absolute', bottom:16, flexDirection:'row', backgroundColor:'transparent'}}>
            {this.renderPooButton(pet)}
            {this.renderPeeButton(pet)}
          </View>
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
    walkingActions: bindActionCreators(Object.assign({}, markingMapActions), dispatch),
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalkingScene);
