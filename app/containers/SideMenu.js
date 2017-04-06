import React from 'react'
import {Modal, View, ScrollView, Text, TouchableHighlight, StyleSheet, Image} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import * as menuActions from '../redux/reducers/sidemenu'
import * as loginActions from '../redux/reducers/login'

class SideMenu extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    // mapping from redux
    menuState: React.PropTypes.object,
    menuActions: React.PropTypes.object,
    loginState: React.PropTypes.object,
    loginActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.menuActions.initialize();
  }

  // ログアウト処理後、ステートの変更を検知し、成功していれば画面遷移する
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.loginState !== this.props.loginState) {
      console.log(nextProps.loginState);
      if (!nextProps.loginState.isLoggedIn) {
        this.props.onChange();
        this.props.navigator.replace({
          name: 'Login',
        });
      }
    }
  }

  settings() {
    this.props.onChange();
    this.props.navigator.replace({
      name: 'Settings',
    });
  }
  logout() {
    this.props.onChange();
    this.props.loginActions.logout();
  }

  render() {
    var goMap = () => {
      this.props.onChange();
      this.props.navigator.replace({
        name: 'Map',
      });
    };

    // Create My Pet List
    var list = [];
    this.props.menuState.pets.forEach((pet, i) => {
      var handlePress = () => {
        this.props.onChange();
      };
      list.push(
        <List key={i} avatar={require('./images/login.jpg')} iconColor="#4CAF50" title={pet.name} onPress={handlePress} chevron={true}/>
      );
    });
    const profileImage = {uri: this.props.loginState.user.imageUrl};

    // Render View
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:'#FF9800'}}>
        <View style={{paddingTop:16, paddingBottom:24,}}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{paddingTop:32, paddingBottom:8}}>
              <Image style={styles.image} source={profileImage}/>
            </View>
          </View>
          <View style={{justifyContent:'center', alignItems:'center', padding:0, margin:0}}>
            <Text style={{fontSize:16, color:'#333333', fontWeight:'bold', paddingTop:2, paddingBottom:2, padding:0, margin:0}}>
              {this.props.loginState.user.username}
            </Text>
          </View>
        </View>
        <ScrollView style={{flex:1, margin:0, padding:0, backgroundColor:'#ffffff'}}>
          <ListGroup margin={false}>
            <List icon="map" iconColor="#4CAF50" title="散歩マップ" onPress={goMap} chevron={true}/>
            {list}
            <List icon="settings" iconColor="#607D8B" title="設定" onPress={this.settings.bind(this)} chevron={true}/>
            <List icon="power-settings-new" iconColor="#F44336" title="ログアウト" border={false} onPress={this.logout.bind(this)}/>
          </ListGroup>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  icon: {
    fontSize:24,
    paddingLeft:4,
    paddingRight:6
  }
});

// ---------- Redux Defs ----------

function mapStateToProps(state) {
  return {
    menuState: state.menu,
    loginState: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(Object.assign({}, menuActions), dispatch),
    loginActions: bindActionCreators(Object.assign({}, loginActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(SideMenu);
