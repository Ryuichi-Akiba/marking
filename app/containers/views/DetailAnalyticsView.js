import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, ScrollView, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import * as rootActions from '../../redux/reducers/root'
import * as detailActions from '../../redux/reducers/detail'
import MarkingNavbar from '../../components/common/MarkingNavbar'
import PetImage from '../../components/pets/PetImage'
import ListGroup from '../../components/elements/ListGroup'
import List from '../../components/elements/List'
import Label from '../../components/elements/Label'
import Badge from '../../components/elements/Badge'
import LineChartView from '../views/LineChartView'
import Colors from '../../themes/Colors'

class DetailAnalyticsView extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    pet: React.PropTypes.object.isRequired,
    // map from react-redux
    rootState:     React.PropTypes.object,
    rootActions:   React.PropTypes.object,
    detailState:   React.PropTypes.object,
    detailActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    const date = moment();
    this.state = {date, data:this.createEmptyChartData(date)};
  }

  componentWillMount() {
    this.props.detailActions.getMonthlyWalkings({pet:this.props.pet, date:this.state.date.toDate()});
  }

  componentWillReceiveProps(newProps) {
    // 指定月の散歩情報を取得できた場合に、グラフを描画するためにデータ変換する
    if (this.props.detailState.successGetMonthlyWalkings !== newProps.detailState.successGetMonthlyWalkings) {
      if (newProps.detailState.successGetMonthlyWalkings) {
        console.log('change monthly data');
        // APIから取得したデータをグラフ描画するために変換する
        const monthly = newProps.detailState.monthly;
        console.log(monthly);
        const data = this.toChartData(monthly);
        this.setState({data});
        this.props.detailActions.clear(); // 情報が取れたのでステートを一旦クリアする
      }
    }
  }

  handleReload(date: moment) {
    const data = this.createEmptyChartData(date);
    this.setState({date, data});
    this.props.detailActions.getMonthlyWalkings({pet:this.props.pet, date:date.toDate()});
  }

  createEmptyChartData(date: moment) {
    // X軸になる今月分の日付データを作成する
    const month = date.month();
    const axis = new Array();
    for (var i = 1; i <= date.daysInMonth(); i++) {
      axis.push(moment().month(month).date(i).format('YYYYMMDD'));
    }
    console.log(axis);

    const data = axis
      .map((x) => {
        return {"x":parseInt(x) , "y":0};
      });
    console.log(data);

    return new Array(data);
  }

  toChartData(monthly: Array) {
    // 事前に作成されているX軸になる今月分の日付データを取得する
    var axis = this.state.data[0];

    // 事前に同じ日付のデータをマージしておく
    const map = new Object();
    monthly.forEach((item) => {
      const date = moment(item.startDateTime).format('YYYYMMDD');
      const values = map[date] ? map[date] : new Array();
      values.push(item);
      map[date] = values;
    });
    console.log(map);

    // チャート表示するための形式に変換する
    const chart = axis
      .map((axis) => {
        // TODO とりあえずPOOだけ取得
        const x = axis.x;
        const values = map[x] ? map[x] : new Array();
        var count = 0;
        values.forEach((item) => {
          const events = item.events ? item.events : new Array();
          events.forEach((e) => {
            if (e.eventType === 'POO') count++;
          });
        });
        return {"x":x, "y":count};
      });
    console.log(chart);

    return new Array(chart);
  }

  render() {
    const date = this.state.date;
    const data = this.state.data;
    const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};

    return (
      <View style={{flex:1, backgroundColor:Colors.white}}>
        <MarkingNavbar title="分析" left={left}/>
        <ScrollView style={{flex:1}}>
          <View style={{flex:1, flexDirection:'column', backgroundColor:Colors.backgroundColor, alignItems:'center', justifyContent:'center'}}>
            <PetImage source={{uri:this.props.pet.image}} name={this.props.pet.name} style={{flex:1}} />
            <Label size="large" color={Colors.gray} numberOfLines={1} style={{flex:1, paddingBottom:24}}>{this.props.pet.name}</Label>
          </View>
          <View style={{flex:1, flexDirection:'row', paddingTop:16, paddingBottom:12}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Label color={Colors.gray} size="large" bold={true} style={{marginRight:4}}>75</Label>
              <Label color={Colors.gray} size="small">cm</Label>
            </View>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Label color={Colors.gray} size="large" bold={true} style={{marginRight:4}}>4500</Label>
              <Label color={Colors.gray} size="small">g</Label>
            </View>
          </View>
          <View style={{paddingBottom:16}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:3, borderColor:Colors.backgroundColor, paddingBottom:8, marginLeft:16, marginRight:16, marginTop:16, marginBottom:16}}>
              <TouchableOpacity style={{flex:1, alignItems:'flex-start', justifyContent:'flex-start'}} onPress={() => this.handleReload(date.add(-1, 'month'))}>
                <MAIcon name="chevron-left" size={16} color={Colors.gray}/>
              </TouchableOpacity>
              <Label size="large" color={Colors.gray}>{date.format('MMM YYYY')}</Label>
              <TouchableOpacity style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}} onPress={() => this.handleReload(date.add(+1, 'month'))}>
                <MAIcon name="chevron-right" size={16} color={Colors.gray}/>
              </TouchableOpacity>
            </View>
            <LineChartView type="WalkingTime" pet={this.props.pet} data={data}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    detailState: state.detail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    detailActions: bindActionCreators(Object.assign({}, detailActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailAnalyticsView);
