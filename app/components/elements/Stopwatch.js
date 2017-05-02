import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Stopwatch extends React.PureComponent {

  seconds = 0;
  minutes = 0;
  hours = 0;
  t;

  constructor(props) {
    super(props);

    this.state = {
      stopwatchText: '00:00:00',
    };

    this.add = this.add.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.setState({stopwatchText: '00:00:00'});

    this.timer();
  }

  componentWillUnmount() {
    clearTimeout(this.t);
  }

  timer() {
    this.t = setTimeout(this.add, 1000);
  }

  add() {

    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }

    const txt = (this.hours ? (this.hours > 9 ? this.hours.toString() : "0" + this.hours.toString()) : "00") + ":" +
        (this.minutes ? (this.minutes > 9 ? this.minutes.toString() : "0" + this.minutes.toString()) : "00") + ":" +
        (this.seconds > 9 ? this.seconds.toString() : "0" + this.seconds.toString());

    this.setState({stopwatchText: txt});

    this.timer();
  }

  render() {
    return (
        <View>
          <Text>{this.state.stopwatchText}</Text>
        </View>
    );
  }
}