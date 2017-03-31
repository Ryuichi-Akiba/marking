import React from 'react'
import {Modal, View, ScrollView, Text, TouchableHighlight, StyleSheet, Image} from 'react-native'
import {List, ListItem} from 'react-native-elements'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

export default class SideMenu extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    var goMap = () => {
      this.props.onChange();
      this.props.navigator.push({
        name: 'Map',
      });
    };
    var logout = () => {
      this.props.onChange();
      this.props.navigator.pop({
        name: 'Login',
      });
    };
    var handlePress = () => {
      this.props.onChange();
      console.log('press link');
    };

    return (
      <View>
        <View style={{paddingTop:24, marginBottom:8, paddingLeft:16, paddingRight:16, paddingBottom:8, borderBottomWidth:0.5, borderBottomColor:'#cccccc'}}>
          <View style={{paddingTop:8}}>
            <Image style={styles.image} source={{uri:'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1965038_642971409111875_735658247_n.jpg?oh=9af256c695dd2a96d07d11ca2f05dd40&oe=5971F2B3'}}/>
          </View>
          <View style={{paddingTop:8, paddingBottom:8}}>
            <Text
              style={{fontSize:14, color:'#333333', fontWeight:'bold', paddingTop:2, paddingBottom:2}}>Ken Todoroki</Text>
            <Text style={{fontSize:14, color:'#333333', paddingTop:2, paddingBottom:2}}>ken.todoroki@gmail.com</Text>
          </View>
        </View>
        <ScrollView>
          <List>
            <ListItem onPress={goMap} leftIcon={{name:'map', style:styles.icon}} title="散歩マップ" hideChevron={true}/>
            <ListItem title='MOMO' onPress={handlePress} avatar={require('../../containers/images/login.jpg')} avatarStyle={{margin:0, padding:0}} hideChevron={true} containerStyle={{padding:0, margin:0}}/>
            <ListItem roundAvatar title='MOMO' onPress={handlePress} avatar={require('../../containers/images/login.jpg')} hideChevron={true} wrapperStyle={{padding:0}}/>
            <ListItem roundAvatar title='MOMO' onPress={handlePress} avatar={require('../../containers/images/login.jpg')} hideChevron={true} titleContainerStyle={{padding:0}}/>
            <ListItem leftIcon={{name:'settings', style:styles.icon}} title="設定" hideChevron={true}/>
            <ListItem onPress={logout} leftIcon={{name:'exit-to-app', style:styles.icon}} title="ログアウト" hideChevron={true}/>
          </List>

          <View style={{flex:1, flexDirection:'row', paddingTop:8, paddingBottom:8}}>
            <View style={{paddingTop:4, paddingBottom:4, margin:0, paddingRight:16}}>
              <MAIcon name="map" size={24} color={'#999999'} />
            </View>
            <TouchableHighlight style={{flex:1, paddingTop:8, paddingBottom:8,}} onPress={goMap}>
              <Text style={{fontSize:16, color:'#333333'}}>散歩マップ</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex:1, flexDirection:'row', paddingTop:8, paddingBottom:8}}>
            <View style={{paddingTop:4, paddingBottom:4, margin:0, paddingRight:16}}>
              <MAIcon name="pets" size={24} color={'#999999'} />
            </View>
            <TouchableHighlight style={{flex:1, paddingTop:8, paddingBottom:8,}}>
              <Text style={{fontSize:16, color:'#333333'}}>ペット</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex:1, flexDirection:'row', paddingTop:8, paddingBottom:8}}>
            <View style={{paddingTop:4, paddingBottom:4, margin:0, paddingRight:16}}>
              <MAIcon name="settings" size={24} color={'#999999'} />
            </View>
            <TouchableHighlight style={{flex:1, paddingTop:8, paddingBottom:8,}}>
              <Text style={{fontSize:16, color:'#333333'}}>設定</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex:1, flexDirection:'row', paddingTop:8, paddingBottom:8}}>
            <View style={{paddingTop:4, paddingBottom:4, margin:0, paddingRight:16}}>
              <MAIcon name="exit-to-app" size={24} color={'#999999'} />
            </View>
            <TouchableHighlight style={{flex:1, paddingTop:8, paddingBottom:8,}} onPress={logout}>
              <Text style={{fontSize:16, color:'#333333'}}>ログアウト</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  icon: {
    fontSize:24,
    paddingLeft:4,
    paddingRight:6
  }
});
