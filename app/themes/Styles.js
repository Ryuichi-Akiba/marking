// @flow
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  avatarMiddle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'rgba(255,255,255,0.75)',
    borderWidth: 3,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  container: {
    flex: 1,
    //justifyContent: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  loginButton: {
    padding: 5,
  },

  // TabBar
  tabBarStyle: {
    borderTopWidth : .5,
    borderColor    : '#b7b7b7',
    backgroundColor: '#FFFFFF',
    opacity        : 1
  },

  // Map
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
