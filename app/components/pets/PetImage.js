import React from 'react'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import {View, Image, StyleSheet} from 'react-native'
import {Pie} from 'react-native-pathjs-charts'
import Avatar from '../../components/elements/Avatar'
import Colors from '../../themes/Colors'

export default class PetImage extends React.PureComponent {
  static propTypes = {
    source: React.PropTypes.object,
    name: React.PropTypes.string,
    style: React.PropTypes.object,
    denominator: React.PropTypes.number,
    molecule: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  renderChart() {
    let data = [{
      'name': 'total',
      "population": this.props.molecule,
      "color": {'r':240, 'g':98, 'b':146},
    }, {
      'name': 'minus',
      "population": this.props.denominator - this.props.molecule,
      "color": {'r':255, 'g':255, 'b':255},
    }];
    let options = {
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      height: 32 + 64 + 32,
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: Colors.transparent
      }
    };
    if (this.props.denominator && this.props.molecule) {
      return (
        <View style={{position:'absolute', top:0}}>
          <Pie data={data} options={options} accessorKey="population" r={60} R={64} legendPosition="topLeft"/>
        </View>
      );
    }
    return null;
  }

  renderImage() {
    if (this.props.source || this.props.name) {
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
          <Avatar source={this.props.source} name={this.props.name} size="large"/>
          {this.renderChart()}
        </View>
      );
    } else {
      return (
        <View style={{width:128, height:128, borderRadius:64, alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF'}}>
          <MAIcon name="photo" size={size / 2} style={{color:Colors.inactiveIconColor}}/>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[{alignItems:'center', justifyContent:'center', padding:24}, this.props.style]}>
        {this.renderImage()}
      </View>
    );
  }
}
