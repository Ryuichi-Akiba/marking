import React from "react";
import {Text} from "react-native";
import {createStore, applyMiddleware, compose} from "redux";
import {connect, Provider} from "react-redux";
import {Scene, Router, Actions} from "react-native-router-flux";
import reducers from "./reducers";
import TabIcon from "./components/TabIcon"
import Home from "./containers/Home";
import MyPets from "./containers/MyPets";
import MarkingMap from "./containers/MarkingMap";

// ReduxとRouterのインテグレーション
const RouterWithRedux = connect()(Router);
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(applyMiddleware(...middleware))(createStore)(reducers);

// シーンコンポーネントをReduxと接続したコンポーネントの定義
const HomeComponent = connect()(Home);
const MyPetsComponent = connect()(MyPets);
const MarkingMapComponent = connect()(MarkingMap);

// シーンを定義
const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" initial={true} hideNavBar={true} component={HomeComponent}/>
    <Scene key="tabbar" tabs={true}>
      <Scene key="myPets" component={MyPetsComponent} title="PETS" icon={TabIcon}/>
      <Scene key="markingMap" component={MarkingMapComponent} title="MAP" icon={TabIcon}/>
    </Scene>
  </Scene>
);

// アプリケーションのベース設定
export default class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes}/>
      </Provider>
    )
  }
};
