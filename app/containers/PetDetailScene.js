import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, View, Image, TouchableHighlight, Dimensions, Alert, Text} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
import {Button} from 'react-native-elements'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import * as rootActions from '../redux/reducers/root'
import * as petDetailActions from '../redux/reducers/petDetail'
import ViewContainer from '../components/common/ViewContainer'
import Label from '../components/elements/Label'
import Badge from '../components/elements/Badge'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import MarkingNavbar from '../components/common/MarkingNavbar'
import PetImage from '../components/pets/PetImage'
import Colors from '../themes/Colors'

class PetDetailScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from other scene
    pet: React.PropTypes.object.isRequired,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    detailState: React.PropTypes.object,
    detailActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {date:moment().startOf('date'), markers:[], distance:0, poo:0, pee:0};
  };

  // 初回ロード時に呼び出され、ペットのマーキング情報を取得する
  componentDidMount() {
    const date = this.state.date.toDate();
    const pet = this.props.pet;
    this.props.detailActions.initialize({pet, date, refresh:true});
  }

  // Propsが変更になった時（データが更新された時）に呼び出され、地図にマーカーを描画する
  componentWillReceiveProps(nextProps) {
    if (nextProps.detailState.markings !== this.props.detailState.markings) {
      const state = this.mapToState(this.state.date, nextProps.detailState.markings);
      this.refreshMarkers(state);
    }

    // アーカイブされた場合に呼び出される
    if (nextProps.detailState.archived !== this.props.detailState.archived) {
      if (nextProps.detailState.archived) {
        // TODO 共通処理してアーカイブした旨の表示したい
        console.log('SUCCESS ARCHIVE!!');
        var pet = this.props.pet;
        pet.dead = true;
        this.props.navigator.replace({name:'PetDetail', props:{pet, reload:true}});
      }
    }
  }

  // Stateが変更になった時（日付が変わった時）に呼び出され、地図にマーカーを描画する
  componentWillUpdate(nextProps, nextState) {
    if (nextState.date !== this.state.date) {
      // 地図にマーカーを描画する
      const state = this.mapToState(nextState.date, nextProps.detailState.markings);
      this.refreshMarkers(state);

      // キャッシュに載せるためにAPIにアクセスしてマーキング情報を取得する
      const start = nextState.date.clone().startOf('week');
      const end = nextState.date.clone().endOf('week');
      const startMonth = start.month();
      const endMonth = end.month();
      if (startMonth !== endMonth) {
        const pet = this.props.pet;
        const thisMonth = this.state.date.month();
        if (thisMonth === startMonth) {
          this.props.detailActions.findNewMarkings({pet, date:end.toDate(), refresh:false}, this.props.detailState.dates);
        } else {
          this.props.detailActions.findNewMarkings({pet, date:start.toDate(), refresh:false}, this.props.detailState.dates);
        }
      }
    }
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
      edgePadding: {top:60, right:60, bottom:60, left:60},
      animated: true,
    });
    this.setState(state);
  }

  renderBackground() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Image source={require('../components/common/images/bg/field.jpg')} style={{width:deviceWidth, height:300, resizeMode:'cover'}}/>
    );
  }

  renderForeground() {
    return (
      <View style={{paddingTop:56}}>
        <PetImage source={{uri:this.props.pet.image}} size="large"/>
      </View>
    );
  }

  renderFixedHeader() {
    const left = {icon:'menu', handler:this.props.openMenu};
    const right = {icon:'mode-edit', handler:() => this.props.navigator.push({name:'PetFormScene', props:{isNewWindow:true, pet:this.props.pet}})};
    return (
      <MarkingNavbar title={this.props.pet.name} left={left} right={right} transparent={true}/>
    );
  }

  handlePressNextWeek(num) {
    var next = this.state.date.clone().add(num, 'days');
    this.setState({date:next});
  }

  renderCalendar() {
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
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Label small={true} style={{marginBottom:8}}>{days[d.day()]}</Label>
          <Badge color={color} disabled={disabled} active={active} onPress={changeStateDate}>{d.date()}</Badge>
        </View>
      );
      list.push(element);
    }

    const handleNext = () => this.handlePressNextWeek(7);
    const handleBefore = () => this.handlePressNextWeek(-7);
    const title = (
      <View style={{marginTop:8, marginBottom:8}}>
        <View style={{flex:1, flexDirection:'row'}}>
          <TouchableHighlight onPress={handleBefore} underlayColor={Colors.white}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginLeft:-5, marginRight:-5}}>
              <Label small={true} style={{marginBottom:8}}> </Label>
              <MAIcon name="keyboard-arrow-left" size={24} color={Colors.gray}/>
            </View>
          </TouchableHighlight>
          {list}
          <TouchableHighlight onPress={handleNext} underlayColor={Colors.white}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginLeft:-5, marginRight:-5}}>
              <Label small={true} style={{marginBottom:8}}> </Label>
              <MAIcon name="keyboard-arrow-right" size={24} color={Colors.gray}/>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:8}}>
          <Label>{this.state.date.format('YYYY年MM月DD日') + days[this.state.date.day()] + '曜日'}</Label>
        </View>
      </View>
    );
    return (
      <List title={title} border={false} hideChevron={true}/>
    );
  }

  renderSummary() {
    const title = (
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={{backgroundColor:Colors.lightBlue, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="explore" size={32} color={Colors.white} style={{marginBottom:5}}/>
          <Label large={true} color={Colors.white} bold={true} style={{marginBottom:5}}>{this.state.distance}</Label>
          <Label small={true} color={Colors.white} bold={true}>m</Label>
        </View>
        <View style={{backgroundColor:Colors.pink, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="cloud" size={32} color={Colors.white} style={{marginBottom:5}}/>
          <Label large={true} color={Colors.white} bold={true} style={{marginBottom:5}}>{this.state.poo}</Label>
          <Label small={true} color={Colors.white} bold={true}>Poo</Label>
        </View>
        <View style={{backgroundColor:Colors.amber, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="opacity" size={32} color={Colors.white} style={{marginBottom:5}}/>
          <Label large={true} color={Colors.white} bold={true} style={{marginBottom:5}}>{this.state.pee}</Label>
          <Label small={true} color={Colors.white} bold={true}>Pee</Label>
        </View>
      </View>
    );
    return (
      <List title={title} border={false} hideChevron={true}/>
    );
  }

  createMarkers() {
    var list = [];
    this.state.markers.forEach((marker, index) => {
      list.push(<MapView.Marker key={index} coordinate={marker} title={marker.title} description={marker.description}/>);
    });
    return list;
  }

  renderMap() {
    const window = Dimensions.get('window');
    const mapStyle = {flex:1, height:window.height / 3};
    const region = {latitude:0, longitude:0, latitudeDelta:0, longitudeDelta:0};
    return (
      <MapView style={mapStyle} ref={(ref) => {this.map = ref;}} initialRegion={region}>
        {this.createMarkers()}
      </MapView>
    );
  }

  renderOther() {
    if (!!this.props.pet.dead || this.props.pet.dead === '1') {
      return (
        <Button icon={{name:'account-balance'}} backgroundColor={Colors.red} title="アーカイブされています" />
      );
    } else {
      return (
        <ListGroup title="その他">
          <List icon="account-balance" iconColor={Colors.red} title="アーカイブ（思い出）する" border={false} onPress={this.handleArchiveLink.bind(this)}/>
        </ListGroup>
      );
    }
  }

  handleArchiveLink() {
    Alert.alert('アーカイブしますか？', '思い出になったペットをアーカイブします。アーカイブすると新しくマーキング記録できなくなります。', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => this.props.detailActions.archivePet(this.props.pet)},
    ]);
  }

  render() {
    var title = 'マーキングスポット';
    if (this.state.empty) {
      title = 'お散歩情報がありません';
    }

    return (
      <ParallaxScrollView backgroundColor={Colors.backgroundColor} parallaxHeaderHeight={270} stickyHeaderHeight={64} backgroundSpeed={3}
                          renderBackground={this.renderBackground.bind(this)} renderForeground={this.renderForeground.bind(this)} renderFixedHeader={this.renderFixedHeader.bind(this)}>
        <ViewContainer>
          <ListGroup margin={false} borderTop={false}>
            {this.renderCalendar()}
          </ListGroup>
          <ListGroup title={title}>
            {this.renderMap()}
          </ListGroup>
          {this.renderSummary()}
          {this.renderOther()}
        </ViewContainer>
      </ParallaxScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    detailState: state.petDetail,
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
)(PetDetailScene);
