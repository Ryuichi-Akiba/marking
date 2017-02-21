import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native";
import {bindActionCreators} from 'redux';
import Styles from '../themes/Styles';
import {connect} from "react-redux";
import MapView from 'react-native-maps'
import * as markingMapActions from '../redux/reducers/markingMap'

class MarkingMap extends Component {

  componentWillMount() {
    const {actions} = this.props;

    actions.getCurrentLocation();
    actions.initWatchId();
    actions.showPets(false);
  }

  componentWillUnmount() {
    const {state, actions} = this.props;

    actions.clearLocationWatch({watchId: state.watchId})
  }

  showPetsModal(modalVisible) {
    const {actions} = this.props;

    actions.showPets(modalVisible);
  }

  render() {
    const {state, actions} = this.props;

    return (
      <View style={Styles.container}>
        {/* 散歩の地図 */}
        <MapView
          style={Styles.map}
          showsUserLocation={true}
          region={state.region}
          onRegionChange={actions.updateCurrentLocation}
        />

        {/* 散歩開始ボタン */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => this.showPetsModal(true)}>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>

        {/* 散歩に連れていくペットの一覧(モーダル) */}
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={state.modalVisible}
          onRequestClose={() => {console.log('modal close!!!')}}>
          <View>
            <Text>My Pet List</Text>
            <TouchableOpacity
              onPress={() => this.showPetsModal(false)}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  }
}

// TODO Styles.jsに移動する
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 60,
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
