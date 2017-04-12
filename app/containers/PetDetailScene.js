import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ParallaxView from 'react-native-parallax-view'
import * as rootActions from '../redux/reducers/root'
import * as petDetailActions from '../redux/reducers/petDetail'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import MarkingNavbar from '../components/common/MarkingNavbar'
import NavbarIcon from '../components/common/NavbarIcon'
import PetImage from '../components/pets/PetImage'

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

  renderHeader() {
    return (
      <View>
        <MarkingNavbar title={this.props.pet.name} left={<NavbarIcon icon="menu" onPress={this.props.openMenu}/>} transparent={true}/>
        <PetImage source={{uri:this.props.pet.image}}/>
      </View>
    );
  }

  render() {
    return (
      <ParallaxView backgroundSource={require('../components/pets/images/green-field.jpg')} windowHeight={300} header={this.renderHeader()}>
        <View>
          <ListGroup>
            <List icon="account-balance" iconColor="#F44336" title="アーカイブ（思い出）する" border={false}/>
          </ListGroup>
        </View>
      </ParallaxView>
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
