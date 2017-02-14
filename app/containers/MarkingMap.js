import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View } from "react-native";
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';
import Styles from '../themes/Styles';
import {connect} from "react-redux";
import MapView from 'react-native-maps'
import * as markingMapActions from '../redux/reducers/markingMap'

class MarkingMap extends Component {

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     region: {
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //   }
  // }

  componentDidMount() {
    const {actions} = this.props;

    actions.initCurrentLocation();

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //       }
    //     });
    //   },
    //   (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );
    //
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   const newRegion = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA
    //   }
    //
    //   this.onRegionChange(newRegion);
    // });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const {state, actions} = this.props;

    return (
      <View style={Styles.container}>
        <MapView
          showsUserLocation={true}
          region={state.region}
          style={Styles.map}
          onRegionChange={actions.successInitCurrentLocation}
        />
      </View>
    );
  }
}

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
