import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
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
    this.state = {region:{latitude: 43.2931047, longitude: 5.38509780000004, latitudeDelta: 0.0922/1.2, longitudeDelta: 0.0421/1.2}, cluster:null, poo:null, pee:null};
  }

  componentWillMount() {
    this.props.detailActions.getWalkingEvents({pet:this.props.pet});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.detailState.successGetWalkingEvents !== nextProps.detailState.successGetWalkingEvents) {
      // マーキングエリア表示のための散歩情報の取得に成功した場合は、地図にマーカーを描画する
      if (nextProps.detailState.successGetWalkingEvents) {
        const events = nextProps.detailState.events;
        console.log(events);

        if (!!events && events.length > 0) {
          this.setRegion({latitude:events[0].geometry.coordinates[1], longitude:events[0].geometry.coordinates[0], latitudeDelta: 0.0922/1.2, longitudeDelta: 0.0421/1.2});
        }

        // FIXME マップポイントはマーカーする場所っぽい（一時的に、関係ない場所の情報を使う）
        const data = events;
        if (data) {
          // this.setState({
          //   mapLock: true
          // });

          // SuperClusterを使って、マーカーの場所を集約する
          const cluster = supercluster({
            radius: 60,
            maxZoom: 16,
          });
          cluster.load(data);

          this.setState({
            cluster,
            // mapLock: false
          });
        }

        this.props.detailActions.clear();
      }
    }
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
    // this.setState({
    //   moving: false,
    // });
  }

  onChangeRegion(region) {
    // this.setState({
    //   moving: true,
    // });
  }

  render() {
    const {region, cluster} = this.state;

    return (
      <View style={{flex:1}}>
        <MapView style={{...StyleSheet.absoluteFillObject}}
                 ref={ref => { this.map = ref; }}
                 region={this.state.region}
                 onRegionChange={this.onChangeRegion.bind(this)}
                 onRegionChangeComplete={this.onChangeRegionComplete.bind(this)}>
          {this.createClusterableMarkers(region, cluster)}
        </MapView>
      </View>
    );
  }

  // FIXME 他の画面でも使いそうなので、後でロジック処理に移動させる
  createClusterableMarkers(region, cluster) {
    if (cluster) {
      // クラスターに集約したマーカー対象のデータを取得する
      const padding = 0.25;
      const markers = cluster.getClusters([
        region.longitude - (region.longitudeDelta * (0.5 + padding)),
        region.latitude - (region.latitudeDelta * (0.5 + padding)),
        region.longitude + (region.longitudeDelta * (0.5 + padding)),
        region.latitude + (region.latitudeDelta * (0.5 + padding)),
      ], this.getZoomLevel());

      // eventTypeとgeometry(GEO JSON)を持つオブジェクト配列を元に、Markerを作成する
      return markers.map(function(item, index) {
        const type = item.eventType || 'Cluster';
        return <ClusterMarker
          key={item.petId + '_' + index}
          region={region}
          geometry={item.geometry}
          type={type}
          label={type === 'Cluster' ? item.properties.point_count.toString() : type}
        />;
      });
    }

    return [];
  }

  getZoomLevel(region = this.state.region) {
    const angle = region.longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
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
