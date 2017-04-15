import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Modal, Animated, Image, Platform} from "react-native";
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

  constructor(props) {
    super(props);

    this.peeAnimatedValue = [];
    this.pooAnimatedValue = [];
  }

  componentWillMount() {
    const {state, actions} = this.props;

    actions.getCurrentLocation();
    actions.initWatchId();
    actions.showMyPets();

    state.pets.forEach((pet) => {
      this.peeAnimatedValue[pet.id] = new Animated.Value(0);
      this.pooAnimatedValue[pet.id] = new Animated.Value(0);
    });

    this.peeAnimate();
    this.pooAnimate();
  }

  componentWillUnmount() {
    const {state, actions} = this.props;

    actions.clearLocationWatch({watchId: state.watchId})
  }

  // 散歩の開始/終了のコントロール
  handleMarking(isStarted) {
    const {actions, state} = this.props;


    const value = isStarted ? 1 : 0;
    Animated.spring(state.visibility, {toValue: value}).start();

    if (isStarted) {
      actions.startMarking(state.markings);
    } else {
      actions.finishMarking(state.markings);
      actions.handleShowPee(true);
      actions.handleShowPoo(true);
    }
  }

  pee(petId) {
    const {state, actions} = this.props;

    console.log('peeしたペットは:' + petId);

    actions.pee(state.markings, petId);

    actions.handleShowPee(state.peeActive);
  }

  poo(petId) {
    const {state, actions} = this.props;

    console.log('pooしたペットは:' + petId);

    actions.poo(state.markings, petId);

    actions.handleShowPoo(state.pooActive);
  }

  handlePee() {
    const {state, actions} = this.props;

    actions.handleShowPee(state.peeActive);
  }

  handlePoo() {
    const {state, actions} = this.props;

    actions.handleShowPoo(state.pooActive);
  }

  peeAnimate() {
    const animations = this.props.state.pets.map((pet) => {
      return Animated.timing(
          this.peeAnimatedValue[pet.id],
          {
            toValue: 1,
            duration: 50,
          }
      );
    });
    Animated.sequence(animations).start();
  }

  pooAnimate() {
    const animations = this.props.state.pets.map((pet) => {
      return Animated.timing(
          this.pooAnimatedValue[pet.id],
          {
            toValue: 1,
            duration: 50,
          }
      );
    });
    Animated.sequence(animations).start();
  }

  render() {
    const {state, actions} = this.props;

    const left = {
      title: 'Open',
      handler: () => {
        this.props.openMenu();
      }
    };

    const txt = !state.isStarted ? 'Start' : 'Finish';

    const bottom = state.visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    const peeAnimations = state.peeActive ?
        state.pets.map((pet, i) => {
      return (
          <Animated.View key={i} style={{opacity: this.peeAnimatedValue[pet.id], marginVertical: 5}}>
            <TouchableOpacity style={styles.raised} onPress={() => this.pee(pet.id)}>
              <Image style={styles.picture} source={{uri: pet.image}}/>
            </TouchableOpacity>
          </Animated.View>
        )
    }) : () => {return (<View/>)};

    const pooAnimations = state.pooActive ?
        state.pets.map((pet, i) => {
      return (
          <Animated.View key={i} style={{opacity: this.pooAnimatedValue[pet.id], marginVertical: 5}}>
            <TouchableOpacity style={styles.raised} onPress={() => this.poo(pet.id)}>
              <Image style={styles.picture} source={{uri: pet.image}}/>
            </TouchableOpacity>
          </Animated.View>
      )
    }) : () => {return (<View/>)};

    const pets = [];
    state.pets.forEach((pet, i) => {
      if (pet.image) {
        pets.push(
            <View key={i} style={styles.raised}>
              <Image style={styles.picture} source={{uri: pet.image}}/>
            </View>
        );
      } else {
        // ペットの画像が登録されてない場合の代替アイコン。
        pets.push(
            <View key={i} style={styles.raised}>
              <Image style={styles.picture} source={require('./images/ic_pets_white_18pt_3x.png')}/>
            </View>
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

              <View style={{flex: 1, flexDirection: 'column'}}>
                {/* うんちするペットボタン */}
                {pooAnimations}

                {/* うんちボタン */}
                <Animated.View style={{bottom}}>
                  <TouchableOpacity style={styles.raised} onPress={() => this.handlePoo()}>
                    <Image style={styles.picture} source={require('./images/ic_delete_white_18pt_3x.png')}/>
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* 散歩開始ボタン */}
              <TouchableOpacity
                  style={[styles.bubble, styles.button, styles.raised]}
                  onPress={() => this.handleMarking(!state.isStarted)}>
                <Text>{txt}</Text>
              </TouchableOpacity>

              <View style={{flex: 1, flexDirection: 'column'}}>
                {/* おしっこするペットボタン */}
                {peeAnimations}

                {/* おしっこボタン */}
                <Animated.View style={{bottom}}>
                  <TouchableOpacity style={styles.raised} onPress={() => this.handlePee()}>
                    <Image style={styles.picture} source={require('./images/ic_location_on_white_18pt_3x.png')}/>
                  </TouchableOpacity>
                </Animated.View>
              </View>

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
    marginHorizontal: 25,
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
    marginHorizontal: 5,
    backgroundColor: 'skyblue',
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 2
      }
    })
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
