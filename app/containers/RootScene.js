import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {SideMenu} from 'react-native-elements'
import * as rootActions from '../redux/reducers/root'
import LoadingScene from './LoadingScene'
import Login from './Login'
import MarkingMap from './MarkingMap'
import PetFormScene from './PetFormScene'
import SettingsScene from './SettingsScene'
import SelectableListViewScene from './SelectableListViewScene'
import SideMenuComponent from './SideMenu'

class RootScene extends React.PureComponent {
  static propTypes = {
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  };

  componentWillMount() {
    // シーンを初期化する
    this.props.rootActions.initializeRootScene();
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'Login'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.configureScene.bind(this)}
      />
    );
  }

  configureScene(route, routeStack) {
    if (route.name === 'SelectableListViewScene') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.FadeAndroid;
  }

  onSideMenuChange (isOpen: boolean) {
    this.setState({
      isOpen: isOpen
    })
  }
  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  wrap(component) {
    return (
      <View style={{flex:1}}>
        {component}
        <LoadingScene/>
      </View>
    );
  }

  renderScene(route, navigator) {
    if (route.name === 'Login') {
      return this.wrap(<Login navigator={navigator} {...route.passProps}/>);
    }
    if (route.name === 'PetFormScene') {
      return this.wrap(<PetFormScene navigator={navigator} {...route.passProps}/>);
    }
    if (route.name === 'SelectableListViewScene') {
      return <SelectableListViewScene navigator={navigator} {...route.passProps}/>;
    }

    var main;
    if (route.name === 'Map') {
      main = this.wrap(<MarkingMap openMenu={this.toggleSideMenu.bind(this)} navigator={navigator} {...route.passProps}/>);
    }
    if (route.name === 'Settings') {
      main = this.wrap(<SettingsScene openMenu={this.toggleSideMenu.bind(this)} navigator={navigator} {...route.passProps}/>);
    }
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={this.onSideMenuChange.bind(this)}
        menu={<SideMenuComponent onChange={this.toggleSideMenu.bind(this)} navigator={navigator}/>}>
        <View style={{flex:1}}>
          {main}
        </View>
      </SideMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScene);
