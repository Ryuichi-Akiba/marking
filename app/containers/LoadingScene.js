import React from 'react'
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as rootActions from '../redux/reducers/root'
import Label from '../components/elements/Label'
import Colors from '../themes/Colors'

// このコンポーネント内でのみ使用するスタイルシート定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
  loadingText: {
    color: '#9E9E9E',
    fontWeight:'bold',
    marginTop: 16,
  }
});

// コンポーネント定義
class LoadingScene extends React.PureComponent {
  static propTypes = {
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  render() {
    if (this.props.rootState.isBlocking) {
      return (
        <View style={[styles.container, {backgroundColor:'rgba(255,255,255,0.5)'}]}>
          <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)', borderRadius:8, paddingTop:16, paddingBottom:16, paddingRight:24, paddingLeft:24}}>
            <ActivityIndicator color={Colors.white} size="large"/>
            <Label color={Colors.white} size="small" style={{marginTop:8}}>Loading..</Label>
          </View>
        </View>
      );
    }

    // ローディング用のシーンを表示する
    if (this.props.rootState.isLoading) {
      return (
        <View style={styles.container}>
          <Image source={require('./images/loading-icon.gif')}></Image>
          <Text style={styles.loadingText}>Now Loading...</Text>
        </View>
      );
    }

    // 他のシーンを表示したいので何もしない
    return null;
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScene);
