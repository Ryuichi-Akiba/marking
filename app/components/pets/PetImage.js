import React from 'react'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import {View, Image, StyleSheet} from 'react-native'

var styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderColor: 'rgba(255,255,255,0.75)',
    borderWidth: 3,
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class PetImage extends React.PureComponent {
  static propTypes = {
    source: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  renderImage() {
    if (this.props.source) {
      return (
        <View>
          <Image style={styles.avatar} source={this.props.source}/>
        </View>
      );
    } else {
      return (
        <View style={[styles.avatar, {alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF'}]}>
          <MAIcon name="photo" size={48} style={{color:'#BDBDBD'}}/>
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
