import React, {PropTypes} from "react";
import {StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginButton, LoginManager, GraphRequestManager} from 'react-native-fbsdk';
import {SocialIcon} from 'react-native-elements'
import Styles from '../themes/Styles';
import * as homeActions from '../redux/reducers/home';
import Session from '../common/auth/Session'

class Home extends React.Component {
  static propTypes = {
    homeState: PropTypes.object,
    homeActions: PropTypes.object
  };

  // ステートの変更と画面描画の変更を検知後、条件を判断して画面遷移させる
  componentDidUpdate() {
    Session.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.props.navigator.push({
          name: 'AddMyPetForm',
        });
      }
    });
  }

  render() {
    const {homeActions, state} = this.props;

    // ログアウト成功時にキックするアクション
    let onLogoutFinished = function() {
      homeActions.onLogout();
    };

    // ログイン完了時にキックするアクション
    const handlePressFacebookButton = () => {
      LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
        function(result) {
          if (result.isCancelled) {
            homeActions.onCancel(result);
          } else {
            homeActions.onLoginWithFacebook(result);
          }
        },
        function(error) {
          homeActions.onError(error);
        }
      );
    };

    return (
      <Image source={require('./images/login.jpg')} style={[styles.backgroundImage]}>
        <View style={styles.loginContainer}>
          <View style={{flex:0.7,}}>
            <Text style={{fontSize: 20, paddingTop:48, textAlign: 'center'}}>
              Marking
            </Text>
            <Text>{JSON.stringify(this.props.homeState)}</Text>
          </View>
          <View style={{flex:0.3}}>
            <SocialIcon title='Sign In With Facebook' button={true} raised={false} type='facebook' onPress={handlePressFacebookButton}/>
            <SocialIcon title='Sign In With Twitter' button={true} raised={false} type='twitter'/>
          </View>
        </View>
      </Image>
    );
  }
}

function mapStateToProps(state) {
  return {
    homeState: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: bindActionCreators(Object.assign({}, homeActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

var deviceWidth = Dimensions.get('window').width;
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: 'center',
    // force layout fixed width
    width:deviceWidth,
  },
  loginContainer: {
    flex: 1,
    margin:0,
    paddingLeft:16,
    paddingRight:16,
    // force layout fixed width
    width: deviceWidth,
  }
});
