import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import MapView from 'react-native-maps'
import Label from '../../components/elements/Label'
import Colors from '../../themes/Colors'
import ImageMarker from '../../assets/marker.png'

export default class ClusterMarker extends React.PureComponent {

  static propTypes = {
    region:   React.PropTypes.object.isRequired, // リージョン
    geometry: React.PropTypes.object.isRequired, // マーカー表示位置
    icon:     React.PropTypes.object,
    type:     React.PropTypes.string,
    label:    React.PropTypes.string,
    color:    React.PropTypes.string, // マーカーの表示色（ペット毎にテーマカラーを決めてその色でマーカー表示）
  };

  static defaultProps = {
    color:    Colors.primary,
  };

  constructor(props) {
    super(props);
    this.state = {colorByCategory: {
      'PEE': Colors.blue,
      'POO': Colors.amber,
      'Cluster': Colors.primary
    }};
  }

  render() {
    const latitude = this.props.geometry.coordinates[1];
    const longitude = this.props.geometry.coordinates[0];
    const type = this.props.type;
    const text = this.props.label;
    const size = this.props.type === 'Cluster' ? 'small' : 'xs';

    return (
      <MapView.Marker coordinate={{latitude, longitude}}>
        {this.renderImage(type)}
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
          <Label size={size} color={Colors.white} style={{textAlign:'center'}}>{text}</Label>
        </View>
      </MapView.Marker>
    );
  }

  renderImage(type:string) {
    if (type !== 'Cluster' && this.props.icon) {
      return this.props.icon;
    } else {
      return <Image style={{tintColor: this.state.colorByCategory[type]}} source={ImageMarker}/>;
    }
  }
}