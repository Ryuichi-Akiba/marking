import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as rootActions from '../redux/reducers/root'

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
    if (this.props.rootState.isLoading) {
      // ローディング用のシーンを表示する
      return (
        <View style={styles.container}>
          <Image source={require('./images/loading-icon.gif')}></Image>
          <Text style={styles.loadingText}>Now Loading...</Text>
        </View>
      );
    } else {
      // 他のシーンを表示したいので何もしない
      return <View></View>;
    }
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
