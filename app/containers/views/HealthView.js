import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import MarkingNavbar from '../../components/common/MarkingNavbar'
import PetImage from '../../components/pets/PetImage'
import Label from '../../components/elements/Label'
import Colors from '../../themes/Colors'

// FIXME 全体の共通定数にしたほうが良いかも
const days = ['日', '月', '火', '水', '木', '金', '土'];

export default class HealthView extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    pet:       React.PropTypes.object.isRequired,
    date:      React.PropTypes.object.isRequired,
    markings:  React.PropTypes.array.isRequired,
    onReload:  React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return true;
  }

  handleReload(date) {
    var d = date.toDate();
    this.props.onReload(this.props.pet, d);
  }

  renderInfo(title: string, value: object, color: string, unit: string) {
    return (
      <View style={{flex:1, flexDirection:'row', paddingTop:12, paddingBottom:12, paddingLeft:16, paddingRight:16, borderRadius:8, marginTop:8, backgroundColor:color}}>
        <View style={{flex:1}}>
          <Label color={Colors.white} bold={true}>{title}</Label>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
          <Label color={Colors.white} bold={true} size="xl" style={{marginRight:8}}>{value}</Label>
          <Label color={Colors.white}>{unit}</Label>
        </View>
      </View>
    );
  }

  sum(markings: array) {
    var walks = 0;
    var pees = 0;
    var poos = 0;
    var foods = 0;
    var distances = 0;
    var times = 0;
    markings.forEach((item) => {
      var start;
      var end;
      item.events.forEach((event) => {
        if (event.eventType === 'START') walks++; // 散歩の回数を数える
        if (event.eventType === 'PEE') pees++;    // おしっこの回数を数える
        if (event.eventType === 'POO') poos++;    // うんちの回数を数える
        if (event.eventType === 'FOOD') foods++;  // 食事の回数を数える
        if (event.eventType === 'START') start = moment(event.eventDateTime);
        if (event.eventType === 'END') end = moment(event.eventDateTime);
      });

      if (!!start && !!end) {
        times += end.diff(start, 'minutes', true);
      }
      distances += item.distance;
    });
    return {walks, distances, times:Math.ceil(times), pees, poos, foods};
  }

  render() {
    const date = moment(this.props.date);
    const sum = this.sum(this.props.markings);
    const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};

    return (
      <View style={{backgroundColor:Colors.white}}>
        <MarkingNavbar left={left}/>
        <ScrollView style={{paddingLeft:16, paddingRight:16}}>
          <View style={{alignItems:'center'}}>
            <Label size="large" bold={true} color={Colors.gray} numberOfLines={1}>{this.props.pet.name}</Label>
          </View>
          <View>
            <PetImage source={{uri:this.props.pet.image}} name={this.props.pet.name} denominator={60} molecule={sum.times}/>
            <TouchableOpacity style={{position:'absolute', top:64, left:0, width:48, height:48, justifyContent:'center', alignItems:'center'}} onPress={() => this.handleReload(date.add(-1, 'days'))}>
              <MAIcon name="chevron-left" size={32} color={Colors.gray}/>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute', top:64, right:0, width:48, height:48, justifyContent:'center', alignItems:'center'}} onPress={() => this.handleReload(date.add(1, 'days'))}>
              <MAIcon name="chevron-right" size={32} color={Colors.gray}/>
            </TouchableOpacity>
          </View>
          <View style={{alignItems:'center'}}>
            <Label color={Colors.lightBlue} size="xl">{sum.times} <Label color={Colors.gray}>min /</Label> {sum.distances} <Label color={Colors.gray}>m</Label></Label>
            <Label color={Colors.gray} size="small" style={{marginTop:8}}>{date.format('YYYY年MM月DD日') + ' ' + days[date.day()] + '曜日'}</Label>
          </View>
          <View style={{marginTop:16}}>
            {this.renderInfo('Walking - お散歩', sum.walks, Colors.lightGreen, '回')}
            {this.renderInfo('Pee - おしっこ', sum.pees, Colors.blue, '回')}
            {this.renderInfo('Poo - うんち', sum.poos, Colors.orange, '回')}
            {this.renderInfo('Food - お食事', sum.foods, Colors.pink, '回')}
          </View>
        </ScrollView>
      </View>
    );
  }
}
