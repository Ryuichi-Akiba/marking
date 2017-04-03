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
import MarkingMap from "./containers/MarkingMap";
import AddMyPetForm from './containers/AddMyPetForm'
import SelectableListViewScene from './containers/SelectableListViewScene'
import SideMenuComponent from './containers/SideMenu'
import MarkingNavbar from './components/common/MarkingNavbar'
import { SideMenu, List, ListItem } from 'react-native-elements'


// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// create redux logger middleware
const loggerMiddleware = createLogger();

// create store with middleware
const middleware = [sagaMiddleware, loggerMiddleware];
const store = compose(
  applyMiddleware(...middleware),
  // autoRehydrate()
)(createStore)(reducers);

// begin periodically persisting the store
// persistStore(store, {storage: AsyncStorage})
// run the saga
sagaMiddleware.run(sagas)

// Router with Redux
// const RouterWithRedux = connect()(Router);
// const HomeComponent = connect()(Home);
// const MarkingMapComponent = connect()(MarkingMap);
// const AddMyPetFormComponent = connect()(AddMyPetForm);
// const SideMenuContainer = connect()(SideMenuComponent);

// アプリケーションのベース設定
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  };

  closeControlPanel = () => {
    this._drawer.close()
  };

  openControlPanel = () => {
    this._drawer.open()
  };

  render() {
    // TODO 別のシーンに分割して、プロミス部分はSAGAに移す
    var initial = 'Login';
//    Session.isLoggedIn().then(isLoggedIn => {
//      if (isLoggedIn) {
//         // ログイン済みの場合の描画コンテンツ
//         console.log(isLoggedIn);
//         initial = 'AddMyPetForm';
//       } else {
//         initial = 'Login';
//       }
//     });

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

  renderScene(route, navigator) {
    var drawer = {
      open: this.openControlPanel.bind(this),
      close: this.closeControlPanel.bind(this)
    };

    var main;
    if (route.name === 'Login') {
      main = (
      <Home navigator={navigator} {...route.passProps}/>
      );
    }
    if (route.name === 'AddMyPetForm') {
      main = (
      <AddMyPetForm drawer={drawer} navigator={navigator} {...route.passProps}/>
      );
    }
    if (route.name === 'Map') {
      main = (
      <MarkingMap openMenu={this.toggleSideMenu.bind(this)} drawer={drawer} navigator={navigator} {...route.passProps}/>
      );
    }
    if (route.name === 'SelectableListViewScene') {
      console.log(route.name);
      main = <SelectableListViewScene navigator={navigator} {...route.passProps}/>;
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
      // <Drawer
      //   type="overlay"
      //   openDrawerOffset={0.2}
      //   acceptTap={true}
      //   ref={(ref) => this._drawer = ref}
      //   content={<SideMenu navigator={navigator} />}
      //   styles={drawerStyles}
      // >
      //   <View style={{flex:1}}>
      //     {main}
      //   </View>
      // </Drawer>
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
