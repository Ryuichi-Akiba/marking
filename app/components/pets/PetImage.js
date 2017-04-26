import React from 'react'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import {View, Image, StyleSheet} from 'react-native'
import Colors from '../../themes/Colors'

var styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default class PetImage extends React.PureComponent {
  static propTypes = {
    source: React.PropTypes.object,
    style: React.PropTypes.object,
    size: React.PropTypes.oneOf(['large','small','middle'])
  };

  static defaultProp = {
    size: 'small',
  };

  constructor(props) {
    super(props);
  }

  renderImage() {
    const size = this.props.size === 'large' ? 128 : this.props.size === 'middle' ? 96 : 48;
    const style = [styles.avatar, {width:size, height:size, borderRadius:size / 2}];

    if (!!this.props.source && !!this.props.source.uri) {
      return (
        <View>
          <Image style={style} source={this.props.source}/>
        </View>
      );
    } else {
      return (
        <View style={[style, {alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF'}]}>
          <MAIcon name="photo" size={size / 2} style={{color:Colors.inactiveIconColor}}/>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[{alignItems:'center', justifyContent:'center', paddingTop:32, paddingBottom:32}, this.props.style]}>
        {this.renderImage()}
      </View>
    );
  }
}
