import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Drawer from 'react-native-drawer'
import DropdownAlert from 'react-native-dropdownalert'
import * as rootActions from '../redux/reducers/root'
import LoadingScene from './LoadingScene'
import Login from './Login'
import MarkingMap from './MarkingMap'
import PetFormScene from './PetFormScene'
import PetDetailScene from './PetDetailScene'
import SettingsScene from './SettingsScene'
import ArchivesScene from './ArchivesScene'
import SelectableListViewScene from '../components/forms/SelectableListViewScene'
import SideMenuScene from './SideMenuScene'
import Colors from '../themes/Colors'

class RootScene extends React.PureComponent {
  static propTypes = {
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    commonState: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    // this.state = {hasErrors:false};
    // this.state = {click:0, errors:[]}; // FIXME 後でもとに戻すこと
  }

  componentWillMount() {
    // シーンを初期化する
    this.props.rootActions.initializeRootScene();
  }

  componentWillReceiveProps(nextProps) {
    // エラー情報が積み上げられたことを検知して、アラートを表示する
    console.log(nextProps);
    if (this.props.rootState.failures !== nextProps.rootState.failures) {
      console.log(nextProps.rootState.failures);
      var item = {type:'error', title:'ERROR', message:JSON.stringify(nextProps.rootState.failures)};
      this.showAlert(item);
    }
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
    if (route.name === 'SettingsScene') {
      main = this.wrap(<SettingsScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'PetDetailScene') {
      main = this.wrap(<PetDetailScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'ArchivesScene') {
      main = this.wrap(<ArchivesScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<SideMenuScene onChange={this.open.bind(this)} navigator={navigator} {...route.props}/>}
        type="overlay"
        tapToClose={true}
        panOpenMask={20}
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
          <DropdownAlert
            ref={(ref) => this.dropdown = ref}
            containerStyle={{
            backgroundColor:Colors.red,
          }}
            onClose={(data) => this.onClose(data)}
            imageSrc={'https://facebook.github.io/react/img/logo_og.png'}
          />
        </View>
      </Drawer>
    );
  }

  showAlert(item) {
    if (item.type == 'dismiss') {
      this.dropdown.onClose();
    } else {
      const random = Math.floor((Math.random() * 1000) + 1);
      const title = item.title + ' #' + random;
      this.dropdown.alertWithType(item.type, title, item.message);
    }
  }

  onClose(data) {
    console.log(data);
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    commonState: state.common,
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
