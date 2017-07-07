import React from 'react'
import {StyleSheet, Text, View, ScrollView, Button, Image, Dimensions, TouchableOpacity, Linking} from 'react-native'
import {Bar, SmoothLine} from 'react-native-pathjs-charts'
import Label from '../../components/elements/Label'
import Colors from '../../themes/Colors'

const {height, width} = Dimensions.get('window');

export default class ChartView extends React.PureComponent {
  static propTypes = {
    // map from root scene
    title: React.PropTypes.string,
    color: React.PropTypes.string,
    type:  React.PropTypes.string.isRequired,
    pet:   React.PropTypes.object.isRequired,
    data:  React.PropTypes.array.isRequired,
  };

  static defaultProps = {
    type: 'line',
    color: Colors.primary,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.renderTitle()}
        {this.renderChart()}
      </View>
    )
  }

  renderTitle() {
    if (this.props.title) {
      return (
        <View style={{alignItems:'center'}}>
          <Label color={Colors.gray} bold={true} style={{padding:8}}>{this.props.title}</Label>
        </View>
      );
    }
    return null;
  }

  renderChart() {
    const data = this.props.data;
    const options = {
      color: this.props.color,
      width: width - 80,
      height: height - 424,
      margin: {
        top: 16,
        left: 40,
        bottom: 16,
        right: 40,
      },
      animate: {
        type: 'delayed',
        duration: 500
      },
      axisX: {
        color: Colors.gray,
        gridColor: Colors.backgroundColor,
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 10,
          fill: Colors.gray
        }
      },
      axisY: {
        color: Colors.gray,
        gridColor: Colors.backgroundColor,
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 10,
          fill: Colors.gray
        }
      },
    };

    // ラインチャートは万能なのでデフォルトの動作
    if (this.props.type === 'line') {
      return <SmoothLine data={data} options={options} xKey="x" yKey="y"/>;
    }
    // バーチャートは、値が0だった時に動作しない
    if (this.props.type === 'bar') {
      return <Bar data={data} options={options} xKey="x" yKey="y"/>;
    }
  }
}
