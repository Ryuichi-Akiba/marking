import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, ScrollView, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Carousel from 'react-native-looped-carousel'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import * as rootActions from '../../redux/reducers/root'
import * as detailActions from '../../redux/reducers/detail'
import MarkingNavbar from '../../components/common/MarkingNavbar'
import PetImage from '../../components/pets/PetImage'
import Label from '../../components/elements/Label'
import ChartView from './ChartView'
import Colors from '../../themes/Colors'

const { width, height } = Dimensions.get('window');
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
    const axis = this.createAxisData(date);
    this.state = {date, axis, chart:{times:new Array(axis), pee:new Array(axis), poo:new Array(axis), food:new Array(axis)}};
  }

  componentWillMount() {
    this.props.detailActions.getMonthlyWalkings({pet:this.props.pet, date:this.state.date.toDate()});
  }

  componentWillReceiveProps(newProps) {
    // 指定月の散歩情報を取得できた場合に、グラフを描画するためにデータ変換する
    if (this.props.detailState.successGetMonthlyWalkings !== newProps.detailState.successGetMonthlyWalkings) {
      if (newProps.detailState.successGetMonthlyWalkings) {
        // APIから取得したデータをグラフ描画するために変換する
        const monthly = newProps.detailState.monthly;
        const base = this.toBaseChartData(monthly);
        this.createAndOverwriteChartData(base);
        this.props.detailActions.clear(); // 情報が取れたのでステートを一旦クリアする
      }
    }
  }

  handleReload(date: moment) {
    const axis = this.createAxisData(date);
    this.setState({date, axis});
    this.props.detailActions.getMonthlyWalkings({pet:this.props.pet, date:date.toDate()});
  }

  createAxisData(date: moment) {
    // グラフ側が動的にX軸を変更してくれないので、毎月31日固定で初期データを作成する
    const axis = new Array();
    for (var i = 1; i <= 31; i++) {
      axis.push({x:i, y:0});
    }
    return axis;
  }

  toBaseChartData(monthly: Array) {
    // 事前に同じ日付のデータをマージしておく
    const map = new Object();
    monthly.forEach((item) => {
      const date = moment(item.startDateTime).format('DD');
      const x = parseInt(date);
      const values = map[x] ? map[x] : new Array();
      values.push(item);
      map[x] = values;
    });
    return map;
  }

  createAndOverwriteChartData(map: Object) {
    // 事前に作成されているX軸になる今月分の日付データを取得する
    var axis = this.state.axis;

    // チャート表示するための形式に変換する
    var times = [];
    var pee = [];
    var poo = [];
    var food = [];
    axis
      .forEach((xy) => {
        const x = xy.x;
        const values = map[x] ? map[x] : new Array();
        // 散歩回数だけ取得
        times.push({"x":x, "y":values.length});

        // POOだけ取得
        var pooCounter = 0;
        values.forEach((item) => {
          const events = item.events ? item.events : new Array();
          events.forEach((e) => {
            if (e.eventType === 'POO') pooCounter++;
          });
        });
        poo.push({"x":x, "y":pooCounter});

        // PEEだけ取得
        var peeCounter = 0;
        values.forEach((item) => {
          const events = item.events ? item.events : new Array();
          events.forEach((e) => {
            if (e.eventType === 'PEE') peeCounter++;
          });
        });
        pee.push({"x":x, "y":peeCounter});
      });

    // チャート用データを全て上書きする
    this.setState({chart: {times:new Array(times), pee:new Array(pee), poo:new Array(poo), food:new Array(axis)}});
  }

  render() {
    const date = this.state.date;
    const data = this.state.data;
    const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};

    return (
      <View style={{flex:1, backgroundColor:Colors.white}}>
        <MarkingNavbar title="分析" left={left}/>
        <ScrollView style={{flex:1}}>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:Colors.transparent, paddingTop:8, paddingBottom:8, paddingLeft:16, paddingRight:16}}>
            <TouchableOpacity style={{flex:1, alignItems:'flex-start', justifyContent:'flex-start'}} onPress={() => this.handleReload(date.add(-1, 'month'))}>
              <MAIcon name="chevron-left" size={16} color={Colors.gray}/>
            </TouchableOpacity>
            <Label>{date.format('YYYY年 MM月')}</Label>
            <TouchableOpacity style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}} onPress={() => this.handleReload(date.add(+1, 'month'))}>
              <MAIcon name="chevron-right" size={16} color={Colors.gray}/>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection:'row', backgroundColor:Colors.backgroundColor, alignItems:'center', justifyContent:'center', paddingLeft:16, paddingRight:16}}>
            <PetImage source={{uri:this.props.pet.image}} name={this.props.pet.name} style={{flex:0.3}} />
            <View style={{flex:0.7, flexDirection:'column'}}>
              <Label size="large" color={Colors.gray} bold={true} numberOfLines={1}>{this.props.pet.name}</Label>
              <Label size="small" color={Colors.gray} numberOfLines={1} style={{marginTop:8}}>{this.props.pet.type}</Label>
            </View>
          </View>
          <View style={{flex:1, paddingTop:16}}>
            <Carousel bullets={true} autoplay={false} bulletStyle={{backgroundColor:Colors.gray}} chosenBulletStyle={{backgroundColor:Colors.primary}} style={{width:width, height:height - 310}}>
              <View>
                <ChartView title="散歩回数" color={Colors.green} pet={this.props.pet} data={this.state.chart.times}/>
              </View>
              <View>
                <ChartView title="おしっこ" color={Colors.blue} pet={this.props.pet} data={this.state.chart.pee}/>
              </View>
              <View>
                <ChartView title="うんち" color={Colors.orange} pet={this.props.pet} data={this.state.chart.poo}/>
              </View>
              <View>
                <ChartView title="食事" color={Colors.primary} pet={this.props.pet} data={this.state.chart.food}/>
              </View>
            </Carousel>
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
