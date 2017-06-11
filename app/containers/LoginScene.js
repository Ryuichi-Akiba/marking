import React, {PropTypes} from "react";
import {StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginManager} from 'react-native-fbsdk';
import {SocialIcon} from 'react-native-elements'
import * as loginActions from '../redux/reducers/login';
import * as rootActions from '../redux/reducers/root';

class LoginScene extends React.PureComponent {
  static propTypes = {
    // map from redux
    loginState: PropTypes.object,
    loginActions: PropTypes.object,
    rootState: PropTypes.object,
    rootActions: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // ログイン処理後、ログインステートの変更を検知し、ログインが成功していれば画面遷移する
    if (this.props.loginState.isLoggedIn !== nextProps.loginState.isLoggedIn) {
      if (nextProps.loginState.isLoggedIn) {
        nextProps.navigator.replace({name: 'HomeScene'});
      }
    }
  }

  // フェイスブックログインのボタンクリック時のアクションを実行する
  handlePressFacebookButton() {
    // プロミスの中でpropsを参照することはできないので、一度変数化する（TODO 後でActionに持っていったほうが良いかも）
    const actions = this.props.loginActions;
    const root = this.props.rootActions;
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      function(result) {
        if (result.isCancelled) {
          actions.cancelLogin(result);
        } else {
          root.viewLoadingScene();
          actions.loginWithFacebook(result);
        }
      },
      function(error) {
        actions.handleLoginError(error);
      }
    );
  }

  render() {
    return (
      <Image source={require('./images/login.jpg')} style={[styles.backgroundImage]}>
        <View style={styles.loginContainer}>
          <View style={{flex:0.75}}>
            <Text style={{fontSize: 20, paddingTop:48, textAlign: 'center'}}>
              Marking
            </Text>
            <Text>{JSON.stringify(this.props.rootState)}</Text>
            <Text>{JSON.stringify(this.props.loginState)}</Text>
          </View>
          <View style={{flex:0.25}}>
            <SocialIcon title='Sign In With Facebook' button={true} raised={false} type='facebook' onPress={this.handlePressFacebookButton.bind(this)}/>
            <SocialIcon title='Sign In With Twitter' button={true} raised={false} type='twitter'/>
          </View>
        </View>
      </Image>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginState: state.login,
    rootState: state.root,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(Object.assign({}, loginActions), dispatch),
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScene);

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