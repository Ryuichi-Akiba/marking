import React from "react";
import {connect} from "react-redux";
import {Scene, Router, Actions} from "react-native-router-flux";
import TabIcon from "./components/TabIcon"
import Home from "./containers/Home";
import MyPets from "./containers/MyPets";
import MarkingMap from "./containers/MarkingMap";

// Router with Redux
const RouterWithRedux = connect()(Router);

// シーンコンポーネントをReduxと接続したコンポーネントの定義
const HomeComponent = connect()(Home);
const MyPetsComponent = connect()(MyPets);
const MarkingMapComponent = connect()(MarkingMap);

// アプリケーションのシーン定義
export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key="home" initial={true} hideNavBar={true} component={HomeComponent}/>
          <Scene key="tabbar" tabs={true}>
            <Scene key="myPets" component={MyPetsComponent} title="PETS" icon={TabIcon}/>
            <Scene key="markingMap" component={MarkingMapComponent} title="MAP" icon={TabIcon}/>
          </Scene>
        </Scene>
      </RouterWithRedux>
    )
  }
};
