import React from 'react'
import {Modal, View, ScrollView, Text, TouchableHighlight, StyleSheet, Image} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {LoginManager, AccessToken} from 'react-native-fbsdk'
import * as menuActions from '../redux/reducers/sidemenu'
import * as loginActions from '../redux/reducers/login'
import {List, ListItem} from 'react-native-elements'
import Session from '../common/auth/Session'

class SideMenu extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    // mapping from redux
    menuState: React.PropTypes.object,
    menuActions: React.PropTypes.object,
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

  logout() {
    this.props.loginActions.logout();
  }

  render() {
    var goMap = () => {
      this.props.onChange();
      this.props.navigator.push({
        name: 'Map',
      });
    };

    // Create My Pet List
    var list = [];
    this.props.menuState.pets.forEach((pet, i) => {
      var handlePress = () => {
        this.props.onChange();
      };
      list.push(<ListItem key={i} title={pet.name} onPress={handlePress} avatar={require('./images/login.jpg')} avatarStyle={{width:24, height:24, marginLeft:4, marginRight:4}} hideChevron={true} containerStyle={{padding:0, margin:0}}/>);
    });

    // Render View
    return (
      <View style={{flex:1, flexDirection:'column', margin:0}}>
        <View style={{paddingTop:16, paddingBottom:8, margin:0,}}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <View style={{paddingTop:32, paddingBottom:8}}>
              <Image style={styles.image} source={{uri:'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1965038_642971409111875_735658247_n.jpg?oh=9af256c695dd2a96d07d11ca2f05dd40&oe=5971F2B3'}}/>
            </View>
          </View>
          <View style={{justifyContent:'center', alignItems:'center', padding:0, margin:0}}>
            <Text style={{fontSize:16, color:'#333333', fontWeight:'bold', paddingTop:2, paddingBottom:2, padding:0, margin:0}}>Ken Todoroki</Text>
          </View>
        </View>
        <ScrollView style={{flex:1, margin:0, padding:0,}}>
          <List style={{marginTop:-20, padding:0}}>
            <ListItem onPress={goMap} leftIcon={{name:'map', style:[styles.icon, {color:'#FF9800'}]}} title="散歩マップ" hideChevron={true}/>
            {list}
            <ListItem leftIcon={{name:'settings', style:[styles.icon, {color:'#607D8B'}]}} title="設定" hideChevron={true}/>
            <ListItem onPress={this.logout.bind(this)} leftIcon={{name:'exit-to-app', style:[styles.icon, {color:'#8BC34A'}]}} title="ログアウト" hideChevron={true}/>
          </List>
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
