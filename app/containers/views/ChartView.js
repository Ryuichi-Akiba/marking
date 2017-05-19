import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, ScrollView, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import MarkingNavbar from '../../components/common/MarkingNavbar'
import PetImage from '../../components/pets/PetImage'
import ListGroup from '../../components/elements/ListGroup'
import List from '../../components/elements/List'
import Label from '../../components/elements/Label'
import Badge from '../../components/elements/Badge'
import Colors from '../../themes/Colors'

export default class ChartView extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    pet: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {date:moment()};
  }

  shouldComponentUpdate() {
    return false;
  }

  renderInfo(title: string, value: object, color: string, unit: string, date: object) {
    return (
      <View style={{flex:1, flexDirection:'column', borderRadius:8, marginTop:8, borderColor:color, borderWidth:2, paddingTop:12, paddingBottom:12, paddingLeft:16, paddingRight:16}}>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Label bold={true}>{title}</Label>
          </View>
          <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
            <Label bold={true} size="xl" style={{marginRight:8}}>{value}</Label>
            <Label color={Colors.gray}>{unit}</Label>
          </View>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', marginTop:4}}>
          <Label color={Colors.gray} size="small">Last Update : {date.format('YYYY-MM-DD')}</Label>
        </View>
      </View>
    );
  }

  handleGoGraphScene(props: object) {
    return () => {
      this.props.navigator.push({name:'BarGraphScene', props});
    };
  }

  render() {
    const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};
    return (
      <View style={{flex:1, backgroundColor:Colors.white}}>
        <MarkingNavbar title="分析" left={left}/>
        <ScrollView style={{flex:1}}>
          <View style={{paddingLeft:16, paddingRight:16}}>
            {this.renderInfo('Height - 大きさ', 75, Colors.deepOrange, 'cm', moment())}
            {this.renderInfo('Weight - 重さ', 4500, Colors.purple, 'g', moment())}
          </View>
          <ListGroup title="日常生活" backgroundColor={Colors.white}>
            <List icon="directions-walk" iconColor={Colors.lightGreen} title="お散歩時間・距離" chevron={true} onPress={this.handleGoGraphScene({type:'WalkingTime', pet:this.props.pet})}/>
            <List icon="opacity" iconColor={Colors.blue} title="おしっこ回数" chevron={true}/>
            <List icon="cloud" iconColor={Colors.orange} title="うんち回数" chevron={true}/>
            <List icon="restaurant-menu" iconColor={Colors.pink} title="お食事回数" chevron={true} border={false}/>
          </ListGroup>
          <ListGroup title="状態" backgroundColor={Colors.white}>
            <List icon="swap-vert" iconColor={Colors.deepOrange} title="大きさの推移" chevron={true}/>
            <List icon="swap-horiz" iconColor={Colors.purple} title="重さの推移" chevron={true} border={false}/>
          </ListGroup>
        </ScrollView>
      </View>
    );
  }
}
