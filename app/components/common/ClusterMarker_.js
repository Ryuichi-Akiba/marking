import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import Label from '../../components/elements/Label'
import Colors from '../../themes/Colors'

const offset_map_small = 0.0001
import ImageMarker from '../../assets/marker.png'

export default class ClusterMarker extends React.PureComponent {

  static propTypes = {
    region:   React.PropTypes.object.isRequired, // リージョン
    cluster:  React.PropTypes.object.isRequired, // クラスターオブジェクト（SuperCluster依存）
    geometry: React.PropTypes.object.isRequired, // マーカー表示位置
    color:    React.PropTypes.string, // マーカーの表示色（ペット毎にテーマカラーを決めてその色でマーカー表示）
  };

  static defaultProps = {
    color:    Colors.primary,
  };

  constructor(props) {
    super(props);
  }

  componentWillUpdate() {
    // 地図に描画するアイコンはImageSourceじゃないといけないので、後で使えるようにステートにロードしておく
    MAIcon.getImageSource('cloud', 40, Colors.amber)
      .then((source) => this.setState({pooIcon:source}));
    MAIcon.getImageSource('opacity', 40, Colors.blue)
      .then((source) => this.setState({peeIcon:source}));
  }

  onPress() {
    if (!this.props.feature.properties.featureclass) {
      //  Calculer l'angle
      const { region } = this.props;
      const category = this.props.feature.properties.featureclass || "Cluster";
      const angle = region.longitudeDelta || 0.0421/1.2;
      const result =  Math.round(Math.log(360 / angle) / Math.LN2);
      //  Chercher les enfants
      const markers = this.props.clusters["places"].getChildren(this.props.feature.properties.cluster_id, result);
      const newRegion = [];
      const smallZoom = 0.05;
      //  Remap
      markers.map(function (element) {
        newRegion.push({
          latitude: offset_map_small + element.geometry.coordinates[1] - region.latitudeDelta * smallZoom,
          longitude: offset_map_small + element.geometry.coordinates[0] - region.longitudeDelta * smallZoom,
        });

        newRegion.push({
          latitude: offset_map_small + element.geometry.coordinates[1],
          longitude: offset_map_small + element.geometry.coordinates[0],
        });

        newRegion.push({
          latitude: offset_map_small + element.geometry.coordinates[1] + region.latitudeDelta * smallZoom,
          longitude: offset_map_small + element.geometry.coordinates[0] + region.longitudeDelta * smallZoom,
        });
      });
      //  Préparer the retour
      const options = {
        isCluster: true,
        region: newRegion,
      };
      //  Ensuite envoyer l'événement
      if (this.props.onPress) {
        this.props.onPress({
          type: category,
          feature: this.props.feature,
          options: options,
        });
      }
    }
  }

  render() {
    const latitude = this.props.feature.geometry.coordinates[1];
    const longitude = this.props.feature.geometry.coordinates[0];
    const category = this.props.feature.properties.featureclass || "Cluster";
    const text = (category  == "Cluster" ? this.props.feature.properties.point_count : category);
    const size = 37;

    return (
      <MapView.Marker coordinate={{latitude, longitude}} onPress={this.onPress.bind(this)}>
        <Image
          style={{tintColor:this.props.color}}
          source={ImageMarker}/>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Label size="small" color={Colors.white} style={{textAlign:'center'}}>{text}</Label>
        </View>
      </MapView.Marker>
    );
  }
}