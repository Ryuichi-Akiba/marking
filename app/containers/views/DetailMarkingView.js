import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
import supercluster from 'supercluster'
import * as rootActions from '../../redux/reducers/root'
import * as detailActions from '../../redux/reducers/detail'
import MarkingNavbar from '../../components/common/MarkingNavbar'
import Colors from '../../themes/Colors'
import ClusterMarker from '../../components/common/ClusterMarker'
import Points from '../../assets/Points.json'
const Marseille = {
  latitude: 43.2931047,
  longitude: 5.38509780000004,
  latitudeDelta: 0.0922/1.2,
  longitudeDelta: 0.0421/1.2,
}

class DetailMarkingView extends React.PureComponent {
  static propTypes = {
    // map from detail scene
    navigator:     React.PropTypes.object.isRequired,
    pet:           React.PropTypes.object.isRequired,
    // map from react-redux
    rootState:     React.PropTypes.object,
    rootActions:   React.PropTypes.object,
    detailState:   React.PropTypes.object,
    detailActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {moving: false, region:{}, clusters:[]};
  }

  componentWillMount() {
    this.props.detailActions.getMarkingWalkings({pet:this.props.pet});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.detailState.successGetMarkingWalkings !== nextProps.detailState.successGetMarkingWalkings) {
      // マーキングエリア表示のための散歩情報の取得に成功した場合は、地図にマーカーを描画する
      if (nextProps.detailState.successGetMarkingWalkings) {
        const walkings = nextProps.detailState.markings;
        console.log(walkings);
        this.props.detailActions.clear();
      }
    }

    const markers = this.createMarkersForLocations(nextProps);
    console.log(markers);
    if (markers && Object.keys(markers)) {
      const clusters = {};
      this.setState({
        mapLock: true
      });
      Object.keys(markers).forEach(categoryKey => {
        // Recalculate cluster trees
        const cluster = supercluster({
          radius: 60,
          maxZoom: 16,
        });

        cluster.load(markers[categoryKey]);

        clusters[categoryKey] = cluster;
      });

      this.setState({
        clusters,
        mapLock: false
      });
    }
  }
  createMarkersForLocations(props) {
    // FIXME マップポイントはマーカーする場所っぽい
    return {
      places: Points
    };
  }

  setRegion(region) {
    if(Array.isArray(region)) {
      region.map(function(element) {
        if (element.hasOwnProperty("latitudeDelta") && element.hasOwnProperty("longitudeDelta")) {
          region = element;
          return;
        }
      })
    }
    if (!Array.isArray(region)) {
      this.setState({
        region: region
      });
    } else {
      console.log("We can't set the region as an array");
    }
  }

  onChangeRegionComplete(region) {
    this.setRegion(region);
    this.setState({
      moving: false,
    });
  }

  onChangeRegion(region) {
    this.setState({
      moving: true,
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <MapView style={{...StyleSheet.absoluteFillObject}}
                 ref={ref => { this.map = ref; }}
                 initialRegion={Marseille}
                 onRegionChange={this.onChangeRegion.bind(this)}
                 onRegionChangeComplete={this.onChangeRegionComplete.bind(this)}>
          {this.createMarkersForRegion_Places()}
        </MapView>
      </View>
    );
  }

  createMarkersForRegion_Places() {
    const padding = 0.25;
    if (this.state.clusters && this.state.clusters["places"]) {
      const markers = this.state.clusters["places"].getClusters([
        this.state.region.longitude - (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude - (this.state.region.latitudeDelta * (0.5 + padding)),
        this.state.region.longitude + (this.state.region.longitudeDelta * (0.5 + padding)),
        this.state.region.latitude + (this.state.region.latitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel());
      const returnArray = [];
      const { clusters, region } = this.state;
      const onPressMaker = this.onPressMaker.bind(this);
      markers.map(function(element ) {
        returnArray.push(
          <ClusterMarker
            key={element.properties._id || element.properties.cluster_id}
            onPress={onPressMaker}
            feature={element}
            clusters={clusters}
            region={region}
          />
        );
      });
      return returnArray;
    }
    return [];
  }
  getZoomLevel(region = this.state.region) {
    const angle = region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
  }
  onPressMaker(data) {
    if (data.options.isCluster) {
      if (data.options.region.length > 0) {
        this.goToRegion(data.options.region, 100)
      } else {
        console.log("We can't move to an empty region");
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    detailState: state.detail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    detailActions: bindActionCreators(Object.assign({}, detailActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMarkingView);
