import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import Drawer from 'react-native-drawer'
import DropdownAlert from 'react-native-dropdownalert'
import * as rootActions from '../redux/reducers/root'
import * as loginActions from '../redux/reducers/login'
import LoadingScene from './LoadingScene'
import LoginScene from './LoginScene'
import HomeScene from './HomeScene'
import HealthScene from './HealthScene'
import WalkingScene from './WalkingScene'
import WalkingSelectScene from './WalkingSelectScene'
import WalkingCompleteScene from './WalkingCompleteScene'
import MarkingScene from './MarkingScene'
import SpotScene from './SpotScene'
import PetFormScene from './PetFormScene'
import DetailScene from './DetailScene'
import BarGraphScene from './BarGraphScene'
import SettingsScene from './SettingsScene'
import ArchivesScene from './ArchivesScene'
import SelectableListViewScene from '../components/forms/SelectableListViewScene'
import SideMenuScene from './SideMenuScene'
import Colors from '../themes/Colors'

class RootScene extends React.PureComponent {
  static propTypes = {
    // map from redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // シーンを初期化する
    this.props.rootActions.initializeRootScene();
  }

  componentWillReceiveProps(nextProps) {
    // 共通ステートにエラー情報が積み上げられたことを検知して、メッセージを表示する
    if (this.props.rootState.errors !== nextProps.rootState.errors) {
      if (nextProps.rootState.errors.length !== 0) {
        const errors = nextProps.rootState.errors;
        var messages = '';
        errors.forEach((error, i) => {
          messages = messages + error.detail;
          messages = i === errors.length - 1 ? messages : messages + '\n';
        });
        const item = {type:'error', title:'', message:messages};
        this.showAlert(item);
      }
    }

    // 共通ステートに処理成功情報が積み上げられたことを検知して、メッセージを表示する
    if (this.props.rootState.message !== nextProps.rootState.message) {
      if (nextProps.rootState.message) {
        const item = {type:'success', title:'', message:nextProps.rootState.message};
        this.showAlert(item);
      }
    }

    // フェイスブックログイン済みだった場合は、もう一度ログイン処理する
    if (nextProps.rootState.isFacebookLogin !== this.props.rootState.isFacebookLogin) {
      if (nextProps.rootState.isFacebookLogin) {
        nextProps.loginActions.loginWithFacebook(); // 再ログインする
      }
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'LoginScene'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.configureScene.bind(this)}
      />
    );
  }

  configureScene(route, routeStack) {
    if (route.name === 'SelectableListViewScene') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  open() {
    this._drawer.open();
  }

  wrap(component) {
    return (
      <View style={{flex:1}}>
        {component}
        <LoadingScene/>
        <DropdownAlert ref={(ref) => this.dropdown = ref} onClose={(data) => this.onClose(data)} errorColor={Colors.error} infoColor={Colors.info} successColor={Colors.success} messageNumOfLines={10}/>
      </View>
    );
  }

  renderScene(route, navigator) {
    this.navigator = navigator;

    if (route.name === 'LoginScene') {
      return this.wrap(<LoginScene navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'PetFormScene') {
      return this.wrap(<PetFormScene navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'SelectableListViewScene') {
      return <SelectableListViewScene navigator={navigator} {...route.props}/>;
    }
    if (route.name === 'BarGraphScene') {
      return this.wrap(<BarGraphScene navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'WalkingScene') {
      main = this.wrap(<WalkingScene navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'WalkingSelectScene') {
      main = this.wrap(<WalkingSelectScene navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'WalkingCompleteScene') {
      main = this.wrap(<WalkingCompleteScene navigator={navigator} {...route.props}/>);
    }

    var main;
    if (route.name === 'HomeScene') {
      main = this.wrap(<HomeScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'HealthScene') {
      main = this.wrap(<HealthScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'MarkingScene') {
      main = this.wrap(<MarkingScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'SpotScene') {
      main = this.wrap(<SpotScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'SettingsScene') {
      main = this.wrap(<SettingsScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
    }
    if (route.name === 'DetailScene') {
      main = this.wrap(<DetailScene openMenu={this.open.bind(this)} navigator={navigator} {...route.props}/>);
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
        </View>
      </Drawer>
    );
  }

  showAlert(item) {
    if (item.type == 'dismiss') {
      this.dropdown.onClose();
    } else {
      this.dropdown.alertWithType(item.type, item.title, item.message);
    }
  }

  onClose() {
    // エラーをクリアする
    this.props.rootActions.clearErrors();
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
    loginActions: bindActionCreators(Object.assign({}, loginActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScene);
