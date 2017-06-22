import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, View, ScrollView, Image, TouchableHighlight, Dimensions, Alert, Text} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
import {Tabs, Tab} from 'react-native-elements'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import * as rootActions from '../redux/reducers/root'
import * as petDetailActions from '../redux/reducers/detail'
import ViewContainer from '../components/common/ViewContainer'
import Label from '../components/elements/Label'
import Badge from '../components/elements/Badge'
import ListGroup from '../components/elements/ListGroup'
import MarkingNavbar from '../components/common/MarkingNavbar'
import PetImage from '../components/pets/PetImage'
import HealthView from './views/HealthView'
import WalkingView from './views/WalkingView'
import ChartView from './views/ChartView'
import Colors from '../themes/Colors'

const window = Dimensions.get('window');

class DetailScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from other scene
    pet: React.PropTypes.object.isRequired,
    isNewWindow: React.PropTypes.bool,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    detailState: React.PropTypes.object,
    detailActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {selected:'health', pet:props.pet, markers:[], distance:0, poo:0, pee:0};
  };

  // 初回ロード時に呼び出され、ペットのマーキング情報を取得する
  componentDidMount() {
    // 初期表示のタブ（ヘルスケアのビュー）に表示するデータを取得する
    const pet = this.props.pet;
    const date = new Date();
    this.props.detailActions.initialize({pet, date});
  }

  // Propsが変更になった時（データが更新された時）に呼び出され、地図にマーカーを描画する
  componentWillReceiveProps(nextProps) {
    if (nextProps.detailState.markings !== this.props.detailState.markings) {
      this.props.rootActions.unblockScene();
      // const state = this.mapToState(this.state.date, nextProps.detailState.markings);
      // this.refreshMarkers(state);
    }
  }

  // Stateが変更になった時（日付が変わった時）に呼び出され、地図にマーカーを描画する
  componentWillUpdate(nextProps, nextState) {
    // if (nextState.date !== this.state.date) {
    //   // 地図にマーカーを描画する
    //   const state = this.mapToState(nextState.date, nextProps.detailState.markings);
    //   this.refreshMarkers(state);
    //
    //   // キャッシュに載せるためにAPIにアクセスしてマーキング情報を取得する
    //   const start = nextState.date.clone().startOf('week');
    //   const end = nextState.date.clone().endOf('week');
    //   const startMonth = start.month();
    //   const endMonth = end.month();
    //   if (startMonth !== endMonth) {
    //     const pet = this.props.pet;
    //     const thisMonth = this.state.date.month();
    //     if (thisMonth === startMonth) {
    //       this.props.detailActions.findNewMarkings({pet, date:end.toDate(), refresh:false}, this.props.detailState.dates);
    //     } else {
    //       this.props.detailActions.findNewMarkings({pet, date:start.toDate(), refresh:false}, this.props.detailState.dates);
    //     }
    //   }
    // }
  }

  // マーキング情報をフィルタリングして必要情報をステートにマップする
  mapToState(date, markings) {
    var distance = 0;
    var poo = 0;
    var pee = 0;
    var markers = [];
    var events = markings.get(date);
    if (events) {
      events
        .forEach((data) => {
          data.events.forEach((event) => {
            // マーカー表示位置を取得して変換する
            const point = {
              title: event.eventType,
              description: event.eventDateTime,
              longitude: event.geometry.coordinates[0],
              latitude: event.geometry.coordinates[1],
            };
            markers.push(point);
            // うんち、おしっこの合計値を算出する
            if (event.eventType === 'POO') poo++;
            if (event.eventType === 'PEE') pee++;
          });
          // 距離の合計値を算出する
          distance = distance + data.distance;
        });
    }
    return {distance, poo, pee, markers, empty:!(distance !== 0 || poo !== 0 || pee !== 0 || markers.length !== 0)};
  }

  refreshMarkers(state) {
    this.map.fitToCoordinates(state.markers, {
      edgePadding: {top:200, right:60, bottom:60, left:60},
      animated: true,
    });
    this.setState(state);
  }

  getImageHeight() {
    const height = window.height;
    return height / 2 - 110;
  }

  renderBackground() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Image source={require('../components/common/images/bg/leaf.jpg')} style={{width:deviceWidth, height:this.getImageHeight(), resizeMode:'cover'}}/>
    );
  }

  handlePressEditButton() {
    this.props.navigator.push({
      name:'PetFormScene',
      props:{
        isNewWindow:true,
        pet:this.state.pet,
        callback:(value) => this.setState({pet:value}),
      }
    });
  }

  // ナビゲーションバーをレンダリングする（アーカイブされたペットと、そうでないペットとで出し分ける）
  renderFixedHeader() {
    const pet = this.state.pet;
    if (!!this.props.isNewWindow) {
      const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};
      return (
        <MarkingNavbar left={left}/>
      );
    } else {
      const left = {icon:'menu', handler:this.props.openMenu};
      const right = !!pet.dead ? null : {icon:'mode-edit', handler:this.handlePressEditButton.bind(this)};
      return (
        <MarkingNavbar title={pet.name} left={left} right={right}/>
      );
    }
  }

  handlePressNextWeek(num) {
    var next = this.state.date.clone().add(num, 'days');
    this.setState({date:next});
  }

  renderWeeklyCalendar() {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    var dateOfFirst = this.state.date.clone().startOf('week');

    var list = [];
    for (var i = 0; i < 7; i++) {
      const d = dateOfFirst.clone().add(i, 'days').startOf('date');
      const markings = this.props.detailState.markings.get(d);
      const color = !markings || markings.length === 0 ? Colors.white : null;
      const active = d.isSame(this.state.date);
      const disabled = d.isAfter(moment());
      const changeStateDate = () => {
        this.setState({date:d});
      };
      var element = (
        <View key={i} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Label style={{marginBottom:4}} size="small">{days[d.day()]}</Label>
          <Badge color={color} disabled={disabled} active={active} onPress={changeStateDate}>{d.date()}</Badge>
        </View>
      );
      list.push(element);
    }

    const handleNext = () => this.handlePressNextWeek(7);
    const handleBefore = () => this.handlePressNextWeek(-7);
    return (
      <View style={{flex:0.2, padding:8}}>
        <View style={{flex:1, flexDirection:'row'}}>
          <TouchableHighlight onPress={handleBefore} underlayColor={Colors.white}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginLeft:-5, marginRight:-5}}>
              <Label size="small" style={{marginBottom:8}}> </Label>
              <MAIcon name="keyboard-arrow-left" size={24} color={Colors.gray}/>
            </View>
          </TouchableHighlight>
          {list}
          <TouchableHighlight onPress={handleNext} underlayColor={Colors.white}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginLeft:-5, marginRight:-5}}>
              <Label size="small" style={{marginBottom:8}}> </Label>
              <MAIcon name="keyboard-arrow-right" size={24} color={Colors.gray}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:8}}>
          <Label>{this.state.date.format('YYYY年MM月DD日') + days[this.state.date.day()] + '曜日'}</Label>
        </View>
      </View>
    );
  }

  renderSummary() {
    const title = (
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={{backgroundColor:Colors.green, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="explore" size={32} color={Colors.white} style={{marginBottom:5}}/>
          <Label size="large" color={Colors.white} bold={true} style={{marginBottom:5}}>{this.state.distance}</Label>
          <Label size="small" color={Colors.white} bold={true}>m</Label>
        </View>
        <View style={{backgroundColor:Colors.orange, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="cloud" size={32} color={Colors.white} style={{marginBottom:5}}/>
          <Label size="large" color={Colors.white} bold={true} style={{marginBottom:5}}>{this.state.poo}</Label>
          <Label size="small" color={Colors.white} bold={true}>Poo</Label>
        </View>
        <View style={{backgroundColor:Colors.blue, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="opacity" size={32} color={Colors.white} style={{marginBottom:5}}/>
          <Label size="large" color={Colors.white} bold={true} style={{marginBottom:5}}>{this.state.pee}</Label>
          <Label size="small" color={Colors.white} bold={true}>Pee</Label>
        </View>
      </View>
    );
    return (
      <View style={{position:'absolute', top:40, left:8, right:8}}>
        {title}
      </View>
    );
  }

  // createMarkers() {
  //   var list = [];
  //   this.state.markers.forEach((marker, index) => {
  //     list.push(<MapView.Marker key={index} coordinate={marker} title={marker.title} description={marker.description}/>);
  //   });
  //   return list;
  // }

  // renderMap() {
  //   const mapStyle = {flex:1, height:window.height / 2};
  //   const region = {latitude:0, longitude:0, latitudeDelta:0, longitudeDelta:0};
  //   return (
  //     <MapView style={mapStyle} ref={(ref) => {this.map = ref;}} initialRegion={region}>
  //       {this.createMarkers()}
  //     </MapView>
  //   );
  // }

  changeTab (selected) {
    this.setState({selected})
  }

  renderTab(key: string, title: string, icon: string, component: object) {
    return (
      <Tab
        titleStyle={{fontWeight: 'bold', fontSize: 10}}
        selected={this.state.selected === key}
        selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
        title={this.state.selected === key ? title : null}
        renderIcon={() => <MAIcon style={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={Colors.gray} name={icon} size={33} />}
        renderSelectedIcon={() => <MAIcon color={Colors.blue} name={icon} size={30} />}
        onPress={() => this.changeTab(key)}>
        {component}
      </Tab>
    );
  }

  reload(pet, date) {
    this.props.rootActions.blockScene();
    this.props.detailActions.initialize({pet, date});
  }

  render() {
    const {date, markings} = this.props.detailState;

    const healthView = <HealthView navigator={this.props.navigator} date={date} pet={this.props.pet} markings={markings} onReload={this.reload.bind(this)}/>;
    const chartView = <ChartView navigator={this.props.navigator} date={date} pet={this.props.pet}/>;
    const walkingView = <WalkingView/>;
    const otherView = (
      <View>
        {this.renderFixedHeader()}
        <Label>FEED</Label>
      </View>
    );

    return (
      <Tabs tabBarStyle={{backgroundColor:Colors.white}}>
        {this.renderTab('health', '記録', 'history', healthView)}
        {/*{this.renderTab('walking', 'お散歩', 'directions-walk', walkingView)}*/}
        {this.renderTab('chart', '分析', 'trending-up', chartView)}
        {/*{this.renderTab('others', 'その他', 'more-horiz', otherView)}*/}
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
