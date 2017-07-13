import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
import supercluster from 'supercluster'
import ClusterMarker from '../components/common/ClusterMarker'
import * as rootActions from '../redux/reducers/root'
import * as markingActions from '../redux/reducers/marking'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import Label from '../components/elements/Label'
import MarkingNavbar from '../components/common/MarkingNavbar'
import Colors from '../themes/Colors'

class MarkingScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    markingState: React.PropTypes.object,
    markingActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {region:{latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0}, cluster:null};
  }

  componentWillMount() {
    this.props.markingActions.getUserWalkingEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.markingState.successGetUserWalkingEvents !== nextProps.markingState.successGetUserWalkingEvents) {
      // マーキングエリア表示のための散歩情報の取得に成功した場合は、地図にマーカーを描画する
      if (nextProps.markingState.successGetUserWalkingEvents) {
        const events = nextProps.markingState.events;
        console.log(events);

        if (!!events && events.length > 0) {
          this.setRegion({latitude:events[0].geometry.coordinates[1], longitude:events[0].geometry.coordinates[0], latitudeDelta: 0.0922/1.2, longitudeDelta: 0.0421/1.2});
          // FIXME マップポイントはマーカーする場所っぽい（一時的に、関係ない場所の情報を使う）
          // SuperClusterを使って、マーカーの場所を集約する
          const cluster = supercluster({radius: 60, maxZoom: 16});
          cluster.load(events);
          this.setState({cluster});
        }

        this.props.markingActions.clear();
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
  }

  onChangeRegion(region) {
  }

  render() {
    const {region, cluster} = this.state;

    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <MarkingNavbar title="マーキング" left={{icon:'arrow-back', handler:() => this.props.navigator.replace({name:'HomeScene'})}}/>
        <View style={{flex:1}}>
          <MapView style={{...StyleSheet.absoluteFillObject}}
                   ref={ref => { this.map = ref; }}
                   region={this.state.region}
                   onRegionChange={this.onChangeRegion.bind(this)}
                   onRegionChangeComplete={this.onChangeRegionComplete.bind(this)}>
            {this.createClusterableMarkers(region, cluster)}
          </MapView>
        </View>
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
    markingState: state.marking,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    markingActions: bindActionCreators(Object.assign({}, markingActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkingScene);
