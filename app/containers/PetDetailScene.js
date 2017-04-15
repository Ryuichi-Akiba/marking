import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import * as rootActions from '../redux/reducers/root'
import * as petDetailActions from '../redux/reducers/petDetail'
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
      <Image source={require('../components/common/images/bg/sea.jpg')} style={{width:deviceWidth, height:300, resizeMode:'cover'}}/>
    );
  }
  renderForeground() {
    return (
      <View>
        <MarkingNavbar title={this.props.pet.name} left={{icon:'menu', handler:this.props.openMenu}} transparent={true}/>
        <PetImage source={{uri:this.props.pet.image}} size="large"/>
      </View>
    );
  }

  render() {
    return (
      <ParallaxScrollView parallaxHeaderHeight={300} stickyHeaderHeight={64} backgroundSpeed={3}
                          renderBackground={this.renderBackground.bind(this)} renderForeground={this.renderForeground.bind(this)}>
        <View style={{flex:1, margin:0, padding:0, backgroundColor:'#ffffff'}}>
          <ListGroup>
            <List icon="account-balance" iconColor={Colors.red} title="アーカイブ（思い出）する" border={false}/>
          </ListGroup>
        </View>
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
