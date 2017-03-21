import React from "react";
import {Navigator, AsyncStorage, View, TouchableOpacity} from "react-native";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider, connect} from "react-redux";
import {persistStore, autoRehydrate} from 'redux-persist';
import Drawer from 'react-native-drawer'
import {Scene, Router, Actions} from "react-native-router-flux";
import FAIcon from 'react-native-vector-icons/FontAwesome'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import createSagaMiddleware from 'redux-saga';
import createLogger  from 'redux-logger';
import reducers from "./redux";
import sagas from "./redux/sagas"
import Styles from "./themes/Styles";
import Session from './common/auth/Session'
import Container from './components/common/Container'
import Home from "./containers/Home";
import MyPets from "./containers/MyPets";
import MarkingMap from "./containers/MarkingMap";
import AddMyPetForm from './containers/AddMyPetForm'
import SelectableListViewScene from './containers/SelectableListViewScene'
import SideMenu from './components/common/SideMenu'
import MarkingNavbar from './components/common/MarkingNavbar'


// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// create redux logger middleware
const loggerMiddleware = createLogger();

// create store with middleware
const middleware = [sagaMiddleware, loggerMiddleware];
const store = compose(
  applyMiddleware(...middleware),
  autoRehydrate()
)(createStore)(reducers);

// begin periodically persisting the store
persistStore(store, {storage: AsyncStorage})
// run the saga
sagaMiddleware.run(sagas)

// Router with Redux
const RouterWithRedux = connect()(Router);
const HomeComponent = connect()(Home);
const MyPetsComponent = connect()(MyPets);
const MarkingMapComponent = connect()(MarkingMap);
const AddMyPetFormComponent = connect()(AddMyPetForm);

// タブ定義
class MyPetsTabIcon extends React.PureComponent {
  render() {
    return (
      <FAIcon name="paw" size={24} color={this.props.selected ? '#333333' : '#999999'}/>
    );
  }
}
class MarkingMapTabIcon extends React.PureComponent {
  render() {
    return (
      <FAIcon name="map-o" size={24} color={this.props.selected ? '#333333' : '#999999'}/>
    );
  }
}

// ---------- MyPets Scene's Component
// ペット追加ボタン
const addPetButton = () => (
  <TouchableOpacity onPress={() => {Actions.addMyPetForm()}}>
    <MAIcon name="add" size={24} color={'#333333'}/>
  </TouchableOpacity>
);
// ペットフォームモーダル閉じるボタン
const closeMyPetFormButton = () => (
  <TouchableOpacity onPress={() => {Actions.pop()}}>
    <MAIcon name="close" size={24} color={'#333333'}/>
  </TouchableOpacity>
);

// アプリケーションのベース設定
export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // };
  closeControlPanel = () => {
    this._drawer.close()
  };

  openControlPanel = () => {
    this._drawer.open()
  }

  render() {
    var initial = 'Login';
    if (Session.isLoggedIn()) {
      // ログイン済みの場合の描画コンテンツ
      // initial = 'AddMyPetForm';
    }

    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name:initial}}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene.bind(this)}
        />
      </Provider>
    )
  }

  configureScene(route, routeStack) {
    if (route.name === 'SelectableListViewScene') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.FadeAndroid;
  }

  renderScene(route, navigator) {
    var drawer = {
      open: this.openControlPanel.bind(this),
      close: this.closeControlPanel.bind(this)
    };

    var main;
    if (route.name === 'Login') {
      main = (
      <HomeComponent navigator={navigator} {...route.passProps}/>
      );
    }
    if (route.name === 'AddMyPetForm') {
      main = (
      <AddMyPetFormComponent drawer={drawer} navigator={navigator} {...route.passProps}/>
      );
    }
    if (route.name === 'Map') {
      main = (
      <MarkingMapComponent drawer={drawer} navigator={navigator} {...route.passProps}/>
      );
    }
    if (route.name === 'SelectableListViewScene') {
      console.log(route.name);
      main = <SelectableListViewScene navigator={navigator} {...route.passProps}/>;
    }

    return (
      <Drawer
        type="overlay"
        openDrawerOffset={0.2}
        acceptTap={true}
        ref={(ref) => this._drawer = ref}
        content={<SideMenu navigator={navigator} />}
        styles={drawerStyles}
      >
        <View style={{flex:1}}>
          {main}
        </View>
      </Drawer>
    );
  }
};

const drawerStyles = {
  drawer: {backgroundColor:'#ffffff', borderRightWidth:0.5, borderRightColor:'#ccc'},
  main: {paddingLeft: 0},
};



// <RouterWithRedux>
//   <Scene key="root">
//     <Scene key="home" initial={true} hideNavBar={true} component={HomeComponent}/>
//     <Scene key="main" tabs={true} tabBarStyle={Styles.tabBarStyle}>
//       <Scene key="myPets" component={MyPetsComponent} title="PETS" icon={MyPetsTabIcon} renderRightButton={addPetButton}/>
//       <Scene key="markingMap" component={MarkingMapComponent} title="MAP" icon={MarkingMapTabIcon}/>
//     </Scene>
//     <Scene key="addMyPetForm" component={AddMyPetFormComponent} hideNavBar={true}/>
//   </Scene>
// </RouterWithRedux>
