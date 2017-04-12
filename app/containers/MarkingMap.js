import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Modal, Animated, Image} from "react-native";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import MapView from 'react-native-maps'
import { SocialIcon } from 'react-native-elements'
import MarkingNavbar from '../components/common/MarkingNavbar'
import * as markingMapActions from '../redux/reducers/markingMap'

class MarkingMap extends Component {
  static propTypes = {
    drawer: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const {actions} = this.props;

    actions.getCurrentLocation();
    actions.initWatchId();
    actions.showMyPets();
  }

  componentWillUnmount() {
    const {state, actions} = this.props;

    actions.clearLocationWatch({watchId: state.watchId})
  }

  handleMarking(isStarted) {
    const {actions, state} = this.props;

    const value = isStarted ? 1 : 0;
    Animated.spring(state.visibility, {toValue: value}).start();

    if (isStarted) {
      actions.startMarking();
    } else {
      actions.finishMarking();
    }

  }

  render() {
    const {state, actions} = this.props;

    var left = {
      title: 'Open',
      handler: () => {
        this.props.openMenu();
      }
    };

    const txt = !state.isStarted ? 'Start' : 'Finish';

    var bottom = state.visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    var pets = [];
    state.pets.forEach((pet, i) => {
      if (pet.image) {
        pets.push(
            <Image style={styles.picture} source={{uri: pet.image}}/>
        );
      } else {
        // ペットの画像が登録されてない場合の代替アイコン。
        pets.push(
            <SocialIcon type='twitter'/>
        );
      }
    });

    return (
        <View style={{flex:1, flexDirection:'column'}}>
          <MarkingNavbar title="散歩マップ" left={left}/>
          <View style={styles.container}>

            {/* 散歩の地図 */}
            <MapView
                style={styles.map}
                showsUserLocation={true}
                region={state.region}
                onRegionChange={actions.updateCurrentLocation}
            />

            {/* ペットのアイコン */}
            <View style={styles.iconContainer}>
              {pets}
            </View>

            <View style={styles.buttonContainer}>
              {/* うんちボタン */}
              <Animated.View style={{bottom}}>
                <SocialIcon type='soundcloud'/>
              </Animated.View>

              {/* 散歩開始ボタン */}
              <TouchableOpacity
                  style={[styles.bubble, styles.button]}
                  onPress={() => this.handleMarking(!state.isStarted)}>
                <Text>{txt}</Text>
              </TouchableOpacity>

              {/* おしっこボタン */}
              <Animated.View style={{bottom}}>
                <SocialIcon type='facebook'/>
              </Animated.View>
            </View>
          </View>

        </View>
    );
  }
}

const SIZE = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: '80%',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  button: {
    width: 100,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  bubble: {
    backgroundColor: 'skyblue',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
  },
  picture: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
});

MarkingMap.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    state: state.markingMap
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markingMapActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkingMap);
