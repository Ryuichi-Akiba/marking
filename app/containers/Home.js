import React, {PropTypes} from "react";
import {StyleSheet, Text, View, Button, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginButton, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import {Actions} from 'react-native-router-flux'
import Styles from '../themes/Styles';
import * as homeActions from '../reducers/home';

class Home extends React.Component {
  componentDidMount() {
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
          // Actions.markingMap();
          actions.onLogin(result);
        }
      }
    }
    let onLogoutFinished = function() {
      actions.onLogout();
    }
    const json = JSON.stringify(this.props.state);

    // 本当か？
    // if (state.token && state.token.isLogin) {
    //   Actions.myPets();
    // }

    return (
      <View style={Styles.container}>
        <View style={{flex:1}}>
          <Text style={{fontSize: 20, margin: 20, textAlign: 'center'}}>
            Marking
          </Text>
          <Text>{json}</Text>
        </View>
        <View style={{flex:1}}>
          <LoginButton
            onLoginFinished={onLoginFinished}
            onLogoutFinished={onLogoutFinished}
            readPermissions={['email','public_profile', 'user_photos']}
            publishPermissions={['publish_actions']}
          />
        </View>
        <View style={{flex:1}}>
          <Button
            onPress={() => {Actions.myPets();}}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
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
