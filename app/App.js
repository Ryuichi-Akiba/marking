import React from "react";
import {Text} from "react-native";
import {Scene, Router} from "react-native-router-flux";
import Home from "./containers/Home";
import MyPets from "./containers/MyPets";
import MarkingMap from "./containers/MarkingMap";

// 一時的に
class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
    );
  }
}

const App = () => (
  <Router>
    <Scene key="root">
      <Scene key="Home" initial={true} hideNavBar={true} component={Home} title="HOME"/>
      <Scene key="tabbar" tabs={true}>
        <Scene key="MyPets" component={MyPets} title="PETS" icon={TabIcon}/>
        <Scene key="MarkingMap" component={MarkingMap} title="MAP" icon={TabIcon}/>
      </Scene>
    </Scene>
  </Router>
);

export default App;
