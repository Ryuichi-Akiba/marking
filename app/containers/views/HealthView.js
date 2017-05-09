import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, View, ScrollView} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import MarkingNavbar from '../../components/common/MarkingNavbar'
import PetImage from '../../components/pets/PetImage'
import Label from '../../components/elements/Label'
import Colors from '../../themes/Colors'

export default class HealthView extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    pet: React.PropTypes.object.isRequired,
    date: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {date:moment()};
  }

  shouldComponentUpdate() {
    return false;
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

  render() {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};
    return (
      <View style={{backgroundColor:Colors.white}}>
        <MarkingNavbar left={left}/>
        <ScrollView style={{paddingLeft:16, paddingRight:16}}>
          <View style={{alignItems:'center'}}>
            <Label size="large" bold={true} color={Colors.gray} numberOfLines={1}>{this.props.pet.name}</Label>
          </View>
          <PetImage source={{uri:this.props.pet.image}} name={this.props.pet.name} denominator={60} molecule={25}/>
          <View style={{alignItems:'center'}}>
            <Label color={Colors.lightBlue} size="large">43 min / 2,234 m</Label>
            <Label color={Colors.gray} size="small" style={{marginTop:8}}>{this.props.date.format('YYYY年MM月DD日') + ' ' + days[this.props.date.day()] + '曜日'}</Label>
          </View>
          <View style={{marginTop:16}}>
            {this.renderInfo('Walking - お散歩', 2, Colors.lightGreen, '回')}
            {this.renderInfo('Pee - おしっこ', 5, Colors.blue, '回')}
            {this.renderInfo('Poo - うんち', 3, Colors.orange, '回')}
            {this.renderInfo('Food - お食事', 2, Colors.pink, '回')}
          </View>
        </ScrollView>
      </View>
    );
  }
}
