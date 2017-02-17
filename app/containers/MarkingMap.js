import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View } from "react-native";
import {bindActionCreators} from 'redux';
import Styles from '../themes/Styles';
import {connect} from "react-redux";
import MapView from 'react-native-maps'
import * as markingMapActions from '../redux/reducers/markingMap'

class MarkingMap extends Component {

  componentDidMount() {
    const {actions} = this.props;

    actions.initCurrentLocation();
    actions.clearWatchID(); // ここでいいのかな？
  }

  componentWillUnmount() {
    const {actions} = this.props;

    // clearWatch用のactionを作るべきと思う
    navigator.geolocation.clearWatch(actions.successClearWatchID());
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
