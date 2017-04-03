import React, {PropTypes} from "react";
import {StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginManager} from 'react-native-fbsdk';
import {SocialIcon} from 'react-native-elements'
import * as homeActions from '../redux/reducers/home';

class Home extends React.PureComponent {
  static propTypes = {
    homeState: PropTypes.object,
    homeActions: PropTypes.object
  };

  // ログイン処理後、ステートの変更を検知し、成功していれば画面遷移する
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.homeState !== this.props.homeState) {
      if (nextProps.homeState.isLoggedIn) {
        this.props.navigator.push({
          name: 'AddMyPetForm',
        });
      }
    }
  }

  // フェイスブックログインのボタンクリック時のアクションを実行する
  handlePressFacebookButton() {
    // プロミスの中でpropsを参照することはできないので、一度変数化する（TODO 後でActionに持っていったほうが良いかも）
    const actions = this.props.homeActions;
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      function(result) {
        if (result.isCancelled) {
          actions.cancelLogin(result);
        } else {
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
            <Text>{JSON.stringify(this.props.homeState)}</Text>
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
