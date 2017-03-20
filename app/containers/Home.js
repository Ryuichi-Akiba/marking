import React, {PropTypes} from "react";
import {StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginButton, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import {SocialIcon} from 'react-native-elements'
import Styles from '../themes/Styles';
import * as homeActions from '../redux/reducers/home';

class Home extends React.Component {
  // ステートの変更と画面描画の変更を検知後、条件を判断して画面遷移させる
  componentDidUpdate() {
    const {state} = this.props;
    if (state.isLogin) {
      var link = () => this.props.navigator.push({
        name: 'AddMyPetForm',
      });
      link();
    }
  }

  render() {
    console.log(this.props.navigator);
    const {actions, state} = this.props;

    // ログイン完了時にキックするアクション
    let onLoginFinished = function(error, result) {
      if (error) {
        actions.onError(error);
      } else {
        if (result.isCanceled) {
          actions.onCancel(result);
        } else {
          actions.onLoginWithFacebook(result);
        }
      }
    };

    // ログアウト成功時にキックするアクション
    let onLogoutFinished = function() {
      actions.onLogout();
    };
    let handleFacebookLink = () => {
      console.log('click link');
      this.props.navigator.push({name: 'AddMyPetForm'});
    };

    return (
      <View style={{flex:1}}>
        <Image source={require('./images/login.jpg')} style={styles.backgroundImage}>
          <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontSize: 20, margin: 20, textAlign: 'center'}}>
                Marking
              </Text>
              <Text>{JSON.stringify(this.props.state)}</Text>
            </View>
            <View>

            </View>
            <View>
              <LoginButton
                onLoginFinished={onLoginFinished}
                onLogoutFinished={onLogoutFinished}
                readPermissions={['public_profile', 'email', 'user_friends']}
              />
              <SocialIcon title='Sign In With Facebook' button={true} raised={false} type='facebook' style={{marginBottom:10}} onPress={handleFacebookLink}/>
              <SocialIcon title='Sign In With Twitter' button={true} raised={false} type='twitter' style={{marginBottom:30}}/>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

Home.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    state: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, homeActions), dispatch)
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
    width:deviceWidth,
  }
});
