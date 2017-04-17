import React from 'react'
import {Navigator, StyleSheet, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
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
  };

  constructor(props) {
    super(props);
  };

  renderBackground() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Image source={require('../components/common/images/bg/field.jpg')} style={{width:deviceWidth, height:300, resizeMode:'cover'}}/>
    );
  }

  renderForeground() {
    return (
      <View style={{paddingTop:64}}>
        <PetImage source={{uri:this.props.pet.image}} size="large"/>
      </View>
    );
  }

  renderFixedHeader() {
    return (
      <MarkingNavbar title={this.props.pet.name} left={{icon:'menu', handler:this.props.openMenu}} transparent={true}/>
    );
  }

  renderCalendar() {
    const title = (
      <View style={{marginTop:8, marginBottom:8}}>
        <View style={{flex:1, flexDirection:'row', marginLeft:8, marginRight:8}}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Label small={true}>日</Label>
            <Badge>9</Badge>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Label small={true}>月</Label>
            <Badge disabled={true}>10</Badge>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Label small={true}>火</Label>
            <Badge>11</Badge>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Label small={true}>水</Label>
            <Badge disabled={true}>12</Badge>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Label small={true}>木</Label>
            <Badge disabled={true}>13</Badge>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Label small={true}>金</Label>
            <Badge>14</Badge>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Label small={true}>土</Label>
            <Badge active={true}>15</Badge>
          </View>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Label>2017年04月15日土曜日</Label>
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
          <MAIcon name="explore" size={32} color={Colors.white} style={{marginBottom:8}}/>
          <Label color={Colors.white}>1,420 m</Label>
        </View>
        <View style={{backgroundColor:Colors.pink, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="cloud" size={32} color={Colors.white} style={{marginBottom:8}}/>
          <Label color={Colors.white}>3 Poo</Label>
        </View>
        <View style={{backgroundColor:Colors.amber, margin:5, width:100, height:100, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
          <MAIcon name="opacity" size={32} color={Colors.white} style={{marginBottom:8}}/>
          <Label color={Colors.white}>5 Pee</Label>
        </View>
      </View>
    );
    return (
      <List title={title} border={false} hideChevron={true}/>
    );
  }

  renderMap() {
    return (
      <MapView style={{flex:1, height:300}} initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }

  render() {
    return (
      <ParallaxScrollView backgroundColor="rgba(0,0,0,0)" parallaxHeaderHeight={300} stickyHeaderHeight={64} backgroundSpeed={3}
                          renderBackground={this.renderBackground.bind(this)} renderForeground={this.renderForeground.bind(this)} renderFixedHeader={this.renderFixedHeader.bind(this)}>
        <ViewContainer>
          <ListGroup margin={false} borderTop={false}>
            {this.renderCalendar()}
          </ListGroup>
          <ListGroup title="サマリ">
            {this.renderSummary()}
          </ListGroup>
          <ListGroup title="マーキング">
            {this.renderMap()}
          </ListGroup>
          <ListGroup title="その他">
            <List icon="account-balance" iconColor={Colors.red} title="アーカイブ（思い出）する" border={false}/>
          </ListGroup>
        </ViewContainer>
      </ParallaxScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    petDetailState: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    petDetailActions: bindActionCreators(Object.assign({}, petDetailActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetDetailScene);
