import React from 'react'
import {View, Animated} from 'react-native'

export default class MessageContainer extends React.PureComponent {
  static propTypes = {
    errors: React.PropTypes.object,
    notify: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {animatedValue:new Animated.Value(-120)};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notify !== this.props.notify) {
      Animated
        .timing(this.state.animatedValue, {toValue:0, duration:500})
        .start(this.close())
    }
  }

  close() {
    setTimeout(() => {
      Animated
        .timing(this.state.animatedValue, {toValue:-120, duration:250})
        .start()
    }, 3000)
  }

  render() {
    var messages = [];
    if (this.props.errors) {
      const keys = Object.keys(this.props.errors);
      keys.forEach((key, i) => {
        messages.push(<Animated.Text key={i} style={{color:'#FFFFFF', marginTop:2, marginBottom:2}}>{this.props.errors[key]}</Animated.Text>)
      });
    }

    return (
      <Animated.View style={{position:'absolute', top:0, left:0, right:0, paddingTop:8, paddingLeft:16, paddingRight:16, paddingBottom:8, backgroundColor:'#D32F2F', transform: [{ translateY: this.state.animatedValue }],}}>
        {messages}
      </Animated.View>
    );
  }
}
