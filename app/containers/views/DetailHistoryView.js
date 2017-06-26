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

export default class DetailHistoryView extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    pet:       React.PropTypes.object.isRequired,
    // 表示している情報の日付
    date:      React.PropTypes.object.isRequired,
    walkings:  React.PropTypes.array.isRequired,
    onReload:  React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleReload(date) {
    var d = date.toDate();
    this.props.onReload(this.props.pet, d);
  }

  renderInfo(title: string, value: object, color: string, unit: string) {
    return (
      <View style={{flex:1, flexDirection:'row', padding:16, borderRadius:32, marginBottom:8, borderWidth:1, borderColor:Colors.borderColor}}>
        <View style={{flex:1}}>
          <Label color={Colors.gray} bold={true}>{title}</Label>
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
          <Label color={Colors.gray} bold={true} size="xl" style={{marginRight:8}}>{value}</Label>
          <Label color={Colors.gray}>{unit}</Label>
        </View>
      </View>
    );
  }

  sum(walkings: array) {
    var walks = walkings.length;
    var pees = 0;
    var poos = 0;
    var distances = 0;
    var times = 0;
    walkings.forEach((item) => {
      const start = moment(item.startDateTime);
      const end = moment(item.endDateTime);
      times += end.diff(start, 'minutes', true);
      distances += item.distance;
      item.events.forEach((event) => {
        if (event.eventType === 'PEE') pees++;    // おしっこの回数を数える
        if (event.eventType === 'POO') poos++;    // うんちの回数を数える
      });
    });
    return {walks, distances, times:Math.ceil(times), pees, poos};
  }

  render() {
    const date = moment(this.props.date);
    const sum = this.sum(this.props.walkings);
    const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};

    return (
      <View style={{backgroundColor:Colors.white}}>
        <MarkingNavbar title={this.props.pet.name} left={left}/>
        <ScrollView style={{paddingLeft:8, paddingRight:8}}>
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
            <Label color={Colors.primary} size="xl">{sum.times} <Label color={Colors.gray}>min /</Label> {sum.distances} <Label color={Colors.gray}>m</Label></Label>
            <Label color={Colors.gray} size="small" style={{marginTop:8}}>{date.format('YYYY年MM月DD日') + ' ' + days[date.day()] + '曜日'}</Label>
          </View>
          <View style={{marginTop:16}}>
            {this.renderInfo('お散歩', sum.walks, Colors.lightGreen, '回')}
            {this.renderInfo('おしっこ', sum.pees, Colors.blue, '回')}
            {this.renderInfo('うんち', sum.poos, Colors.orange, '回')}
            {this.renderInfo('お食事', 0, Colors.pink, '回')}
          </View>
        </ScrollView>
      </View>
    );
  }
}
