import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Linking} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {LoginButton, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import MKGButton from '../components/MKGButton';
import Styles from '../themes/Styles';
import * as homeActions from '../reducers/home';

class Home extends React.Component {
  componentDidMount() {
  }

  onLoginFinished(error,result){
    var getUserFromFB = () => {
      const infoRequest = new GraphRequest(
        '/me?fields=id,name,first_name,last_name,email,gender,picture.width(350).height(350)',
        null,
        (error, result) => {
          if (error) {
            console.log('Error fetching data: ' + error.toString());
          } else {
            console.log('Success fetching data: ' + JSON.stringify(result));
          }
        },
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    }

    // this.setState({loading: false});
    if (error) {
      alert('Error logging in.');
    } else {
      if (result.isCanceled) {
        alert('Login cancelled.');
      } else {
        console.log(JSON.stringify(result));
        getUserFromFB();
      }
    }
  }
  onLogoutFinished(){
    // userActions.parseLogOut();
  }

  render() {
    const {actions} = this.props;

    return (
      <View style={Styles.container}>
        <Text style={Styles.welcome}>
          Marking
        </Text>
        {/*<MKGButton onPress={Actions.tabbar} caption={'Login with Facebook'} type={'primary'}></MKGButton>*/}
        {/*<MKGButton onPress={actions.loginWithFacebook} caption={'Login with Facebook'} type={'primary'}></MKGButton>*/}
        <LoginButton
          onLoginFinished={this.onLoginFinished}
          onLogoutFinished={this.onLogoutFinished}
          readPermissions={['email','public_profile', 'user_photos']}
          publishPermissions={['publish_actions']}
        />
      </View>
    );
  }
}

Home.propTypes = {};

function mapStateToProps(state) {
  return {
    home: state.home
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
