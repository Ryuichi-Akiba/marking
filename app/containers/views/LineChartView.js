import moment from 'moment'
import React from "react"
import {StyleSheet, Text, View, ScrollView, Button, Image, Dimensions, TouchableOpacity, Linking} from "react-native"
import Chart from 'react-native-chart'
import {Bar, SmoothLine} from 'react-native-pathjs-charts'
import Colors from '../../themes/Colors'

const {height, width} = Dimensions.get('window');

export default class LineChartView extends React.PureComponent {
  static propTypes = {
    // map from root scene
    type: React.PropTypes.string.isRequired,
    pet: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    console.log(data);

    const options = {
      color: Colors.primary,
      width: width - 48,
      height: height / 2,
      margin: {
        top: 16,
        left: 32,
        bottom: 16,
        right: 16,
      },
      animate: {
        type: 'delayed',
        duration: 200
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
          fontWeight: true,
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

    return (
      <View style={{flex:1}}>
        <SmoothLine data={data} options={options} xKey="x" yKey="y"/>
      </View>
    )
  }

  getWalkingTimeGraphData() {
    var times = this.props.graphState.walkingTimes;

    // var timeMap = Map();
    var timeMap = {};
    times.forEach((item) => {
      var start = null;
      var end = null;
      item.events.forEach((e) => {
        if (e.eventType === 'START') start = moment(e.eventDateTime);
        if (e.eventType === 'END') end = moment(e.eventDateTime);
      });

      const date = start ? start.format('YYYY-MM-DD') : '';
      // const data = timeMap.get(date);
      const data = timeMap[date];
      var diff = 0;
      if (data) {
        diff = data;
      }
      if (start && end) {
        timeMap[date] = diff + end.diff(start, 'minutes', true);
      }
    });
    console.log(timeMap);
    return timeMap;
  }

  getWalkingTimeGraphData1() {
    var timeData = new Array();
    for (var i = 1; i <= moment().daysInMonth(); i++) {
      var key = moment().date(i);
      timeData.push([key.format('MM/DD'), 0]);
    }

    var timeData2 = new Array();
    for (var i = 1; i <= moment().daysInMonth(); i++) {
      var key = moment().date(i);
      timeData2.push([key.format('MM/DD'), 2]);
    }

    // timeMap.keySeq().toArray().forEach((key) => {
    //   timeData.push({'name':key, 'v':timeMap.get(key)});
    // });
    // Object.keys(timeMap).forEach((key) => {
    //   timeData.push({'name':key, 'v':timeMap[key]});
    // });

    var data = new Array();
    // graph.push({"v": 49, "name":"apple"});
    // graph.push({"v": 23, "name":"apple"});
    // graph.push({"v": 14, "name":"apple"});
    // graph.push({"v": 22, "name":"apple"});
    // graph.push({"v": 30, "name":"apple"});
    data.push(timeData);
    data.push(timeData2);
    console.log(data);
    return data;
  }

  getWalkingTimeGraphData2() {
    var timeData = new Array();
    for (var i = 1; i <= moment().daysInMonth(); i++) {
      var key = moment().date(i);
      timeData.push([{'name':key.format('MM/DD'), 'v':1}]);
    }

    // timeMap.keySeq().toArray().forEach((key) => {
    //   timeData.push({'name':key, 'v':timeMap.get(key)});
    // });
    // Object.keys(timeMap).forEach((key) => {
    //   timeData.push({'name':key, 'v':timeMap[key]});
    // });

    var data = new Array();
    data.push({"v": 49, "name":"apple"});
    data.push({"v": 23, "name":"apple"});
    data.push({"v": 14, "name":"apple"});
    data.push({"v": 22, "name":"apple"});
    data.push({"v": 30, "name":"apple"});
    return data;
    // data.push(timeData);
    // console.log(data);
    // return timeData;
  }

  transformXAxis(x) {
    // var v = x.replace('/', '');
    // const i = parseInt(v, 10);
    // return i % 5 === 0 ? x : '';
    return x;
  }

  renderWalkingTimeGraph() {
    // let data = [
    //   [{
    //     "v": 49,
    //     "name": "apple"
    //   }, {
    //     "v": 42,
    //     "name": "apple"
    //   }],
    // ];
    let options = {
      width: window.width - 40,
      height: window.height / 3,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: Colors.blue,
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: true,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: Colors.gray
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: true,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: Colors.gray
        }
      }
    };
    const data = [
      ['0', 0],
      ['1', 0],
      ['2', 0],
      ['3', 0],
    ];
    return (
      <View style={{flex:1}}>
        <Chart
          style={{width:window.width - 32, height:200}}
          xAxisHeight={32}
          xAxisTransform={(axis) => this.transformXAxis(axis)}
          yAxisWidth={32}
          yAxisShortLabel={true}
          yAxisUseDecimal={true}
          showGrid={false}
          data={this.getWalkingTimeGraphData1()}
          type="line"
          showDataPoint={true}
          color={Colors.lightGreen}
          axisColor={Colors.gray}
          axisLabelColor={Colors.gray}
        />
      </View>
    );
  }
}
