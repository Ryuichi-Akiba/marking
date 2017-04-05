import React from 'react'
import {Modal, View, ScrollView, Text, TouchableHighlight, StyleSheet, Image} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as menuActions from '../redux/reducers/sidemenu'
import * as loginActions from '../redux/reducers/login'
import {List, ListItem} from 'react-native-elements'

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
    const profileImage = {uri: this.props.loginState.user.imageUrl};

    // Render View
    return (
      <View style={{flex:1, flexDirection:'column', margin:0}}>
        <View style={{paddingTop:16, paddingBottom:8, margin:0,}}>
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
