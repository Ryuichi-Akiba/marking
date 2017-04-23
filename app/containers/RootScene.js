import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Drawer from 'react-native-drawer'
import * as rootActions from '../redux/reducers/root'
import LoadingScene from './LoadingScene'
import Login from './Login'
import MarkingMap from './MarkingMap'
import PetFormScene from './PetFormScene'
import PetDetailScene from './PetDetailScene'
import SettingsScene from './SettingsScene'
import SelectableListViewScene from '../components/forms/SelectableListViewScene'
import SideMenuComponent from './SideMenu'

class RootScene extends React.PureComponent {
  static propTypes = {
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
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
    return Navigator.SceneConfigs.FloatFromRight;
  }

  open() {
    this._drawer.open();
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
      return this.wrap(<Login navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'PetFormScene') {
      return this.wrap(<PetFormScene navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'SelectableListViewScene') {
      return <SelectableListViewScene navigator={navigator} {...route.props}/>;
    }

    var main;
    if (route.name === 'Map') {
      main = this.wrap(<MarkingMap openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'Settings') {
      main = this.wrap(<SettingsScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'PetDetail') {
      main = this.wrap(<PetDetailScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<SideMenuComponent onChange={this.open.bind(this)} navigator={navigator} {...route.props}/>}
        type="overlay"
        tapToClose={true}
        panCloseMask={0.2}
        openDrawerOffset={0.2}
        styles={{
          mainOverlay:{
            backgroundColor:'#000',
            opacity: 0
          }
        }}
        tweenHandler={(ratio) => ({
          mainOverlay:{opacity:ratio/2},
        })}
      >
        <View style={{flex:1}}>
          {main}
        </View>
      </Drawer>
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
