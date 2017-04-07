import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as rootActions from '../redux/reducers/root'
import * as loginActions from '../redux/reducers/login'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import MarkingNavbar from '../components/common/MarkingNavbar'
import NavbarIcon from '../components/common/NavbarIcon'

var styles = StyleSheet.create({
  icon: {
    fontSize:24,
    paddingLeft:4,
    paddingRight:6
  }
});

class SettingsScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.loginState !== this.props.loginState) {
      // ログアウト処理後、ステートの変更を検知し、成功していれば画面遷移する
      if (!nextProps.loginState.isLoggedIn) {
        this.props.navigator.replace({name: 'Login'});
      }
    }
  }

  // ログアウト
  logout() {
    Alert.alert('ログアウトしますか？', '', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => this.props.loginActions.logout()},
    ]);
  }

  viewPetForm() {
    this.props.navigator.push({
      name: 'PetFormScene',
      props: {force:true, isNewWindow:true},
    });
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <MarkingNavbar title="設定" left={<NavbarIcon icon="menu" onPress={this.props.openMenu}/>}/>
        <ScrollViewContainer>
          <ListGroup>
            <List icon="pets" iconColor="#795548" title="ペットを登録" chevron={true} border={false} onPress={this.viewPetForm.bind(this)}/>
          </ListGroup>
          <ListGroup>
            <List icon="import-contacts" iconColor="#00BCD4" title="利用規約" chevron={true}/>
            <List icon="assignment" iconColor="#FFC107" title="プライバシーポリシー" chevron={true}/>
            <List icon="bug-report" iconColor="#E91E63" title="お問い合わせ・不具合報告" chevron={true}/>
            <List icon="exposure-plus-1" iconColor="#8BC34A" title="バージョン" rightTitle="1.0.0" border={false}/>
          </ListGroup>
          <ListGroup>
            <List icon="power-settings-new" iconColor="#F44336" title="ログアウト" border={false} onPress={this.logout.bind(this)}/>
          </ListGroup>
        </ScrollViewContainer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    loginState: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    loginActions: bindActionCreators(Object.assign({}, loginActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScene);
