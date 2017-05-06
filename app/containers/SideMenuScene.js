import React from 'react'
import {Modal, View, ScrollView, Text, TouchableHighlight, StyleSheet, Image, Dimensions, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Styles from '../themes/Styles'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import * as menuActions from '../redux/reducers/sidemenu'
import * as loginActions from '../redux/reducers/login'
import Colors from '../themes/Colors'

class SideMenu extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    // mapping from redux
    menuState: React.PropTypes.object,
    menuActions: React.PropTypes.object,
    loginState: React.PropTypes.object,
    loginActions: React.PropTypes.object,
    // map from other scene
    reload: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var reload = this.props.reload;
    console.log('reload menu: ', reload);
    this.props.menuActions.initialize({reload});
  }

  // ログアウト処理後、ステートの変更を検知し、成功していれば画面遷移する
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.loginState !== this.props.loginState) {
      if (!nextProps.loginState.isLoggedIn) {
        this.props.onChange();
        this.props.navigator.replace({
          name: 'Login',
        });
      }
    }
  }

  marking() {
    this.props.onChange();
    this.props.navigator.replace({
      name: 'MenuScene',
    });
  }

  archives() {
    this.props.onChange();
    this.props.navigator.replace({
      name: 'ArchivesScene',
    });
  }

  settings() {
    this.props.onChange();
    this.props.navigator.replace({
      name: 'SettingsScene',
    });
  }

  logout() {
    Alert.alert('ログアウトしますか？', '', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => {
        this.props.onChange();
        this.props.loginActions.logout();
      }},
    ]);
  }

  renderBackground() {
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Image source={require('../components/common/images/bg/mountain.jpg')} style={{width:deviceWidth, height:200, resizeMode:'cover'}}/>
    );
  }

  renderForeground() {
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <View style={{paddingTop:48, paddingBottom:8}}>
          <Image style={Styles.avatarMiddle} source={{uri: this.props.loginState.user.imageUrl}}/>
        </View>
        <Text style={{fontSize:16, color:'#FFFFFF', fontWeight:'bold', paddingTop:2, paddingBottom:2, padding:0, margin:0}}>
          {this.props.loginState.user.username}
        </Text>
      </View>
    );
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
      if (!pet.dead) {
        const handlePress = () => {
          this.props.onChange();
          this.props.navigator.replace({name:'PetDetailScene', props:{pet:pet}});
        };
        list.push(
          <List key={i} avatar={{uri: pet.image}} iconColor="#4CAF50" title={pet.name} onPress={handlePress} chevron={true}/>
        );
      }
    });

    // Render View
    return (
      <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <ParallaxScrollView style={styles.parallax} parallaxHeaderHeight={200} stickyHeaderHeight={64} backgroundSpeed={3}
                            renderBackground={this.renderBackground.bind(this)} renderForeground={this.renderForeground.bind(this)}>
          <View style={{flex:1, margin:0, padding:0, backgroundColor:Colors.white}}>
            <ListGroup margin={false} borderTop={false}>
              <List icon="dashboard" iconColor={Colors.indigo} title="marking" onPress={this.marking.bind(this)} chevron={true}/>
              <List icon="update" iconColor={Colors.red} title="ヘルスケア" onPress={this.marking.bind(this)} chevron={true}/>
              <List icon="directions-walk" iconColor={Colors.lightGreen} title="お散歩" onPress={goMap} chevron={true}/>
              <List icon="bubble-chart" iconColor={Colors.cyan} title="マーキング" onPress={this.marking.bind(this)} chevron={true}/>
              <List icon="public" iconColor={Colors.blue} title="スポット" onPress={this.marking.bind(this)} chevron={true}/>
              {/*{list}*/}
              <List icon="account-balance" iconColor={Colors.purple} title="アーカイブス" onPress={this.archives.bind(this)} chevron={true}/>
              <List icon="settings" iconColor={Colors.blueGray} title="設定" onPress={this.settings.bind(this)} chevron={true}/>
              <List icon="power-settings-new" iconColor={Colors.red} title="ログアウト" onPress={this.logout.bind(this)} border={false}/>
            </ListGroup>
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  parallax: {
    flex:1,
    overflow:'hidden',
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
