import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, Dimensions } from "react-native";
import {Actions} from 'react-native-router-flux';
import Styles from '../themes/Styles';
import {connect} from "react-redux";
import MapView from 'react-native-maps'

var { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MarkingMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.onRegionChange(newRegion);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.state = { region };
  }

  render() {
    return (
      <View style={Styles.container}>
        <MapView
          showsUserLocation={true}
          region={this.state.region}
          style={Styles.map}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}

MarkingMap.propTypes = {
  provider: MapView.ProviderPropType,
};

function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkingMap);
