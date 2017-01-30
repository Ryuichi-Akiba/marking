import React, {PropTypes} from "react";
import {StyleSheet, Text, View, Button, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginButton, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-router-flux'
import Styles from '../themes/Styles';
import * as homeActions from '../reducers/home';

class Home extends React.Component {
  // ステートの変更と画面描画の変更を検知後、条件を判断して画面遷移させる
  componentDidUpdate() {
    const {state} = this.props;
    if (state.token && state.token.isLogin) {
      Actions.main(); // メイン画面に画面遷移
    }
  }

  render() {
    const {actions, state} = this.props;
    console.log(this.props);

    let onLoginFinished = function(error, result) {
      if (error) {
        actions.onError(error);
      } else {
        if (result.isCanceled) {
          actions.onCancel(result);
        } else {
          actions.onLogin(result);
        }
      }
    }

    let onLogoutFinished = function() {
      actions.onLogout();
    }

    return (
      <View style={Styles.container}>
        <View style={{flex:1}}>
          <Text style={{fontSize: 20, margin: 20, textAlign: 'center'}}>
            Marking
          </Text>
          <Text>{JSON.stringify(this.props.state)}</Text>
        </View>
        <View style={{flex:1}}>
          <LoginButton
            onLoginFinished={onLoginFinished}
            onLogoutFinished={onLogoutFinished}
            readPermissions={['email','public_profile', 'user_photos']}
            publishPermissions={['publish_actions']}
          />
        </View>
        {(() => {
          if (state.token.isLogin) {
            return (
              <View style={{flex:1}}>
                <Button onPress={Actions.main} title="Go to Main" color="#841584"/>
              </View>
            )
          }
        })()}
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
