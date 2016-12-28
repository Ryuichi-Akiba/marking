import React from "react";
import {connect} from "react-redux";
import {Scene, Router, Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Content, List, ListItem, Thumbnail, Text} from 'native-base';
import Styles from "./themes/Styles";
import Home from "./containers/Home";
import MyPets from "./containers/MyPets";
import MarkingMap from "./containers/MarkingMap";

// Router with Redux
const RouterWithRedux = connect()(Router);

// シーンコンポーネントをReduxと接続したコンポーネントの定義
const HomeComponent = connect()(Home);
const MyPetsComponent = connect()(MyPets);
const MarkingMapComponent = connect()(MarkingMap);

// タブ定義
class MyPetsTabIcon extends React.Component {
  render(){
    return (
      <Icon name="paw" size={24} color={this.props.selected ? '#333333' : '#999999'} />
    );
  }
}
class MarkingMapTabIcon extends React.Component {
  render(){
    return (
      <Icon name="map-o" size={24} color={this.props.selected ? '#333333' : '#999999'} />
    );
  }
}

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
          <Scene key="tabbar" tabs={true} tabBarStyle={Styles.tabBarStyle}>
            <Scene key="myPets" component={MyPetsComponent} title="PETS" icon={MyPetsTabIcon}/>
            <Scene key="markingMap" component={MarkingMapComponent} title="MAP" icon={MarkingMapTabIcon}/>
          </Scene>
        </Scene>
      </RouterWithRedux>
    )
  }
};
