import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import * as rootActions from '../redux/reducers/root'
import * as menuActions from '../redux/reducers/sidemenu'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import MarkingNavbar from '../components/common/MarkingNavbar'
import Label from '../components/elements/Label'
import Colors from '../themes/Colors'

const styles = StyleSheet.create({
  square: {
    flex:1,
    padding:16,
    marginLeft:4,
    marginRight:4,
    borderRadius:8,
  },
});

class MenuScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    menuState: React.PropTypes.object,
    menuActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    // 最初に必ず来るシーンのため、ルートにあるローディングを常時OFFにして始める
    this.props.rootActions.destroyLoadingScene();
  }

  renderPetList() {
    var list = [];
    this.props.menuState.pets.forEach((pet, i) => {
      const handle = () => {
        this.props.navigator.push({name:'PetDetailScene', props:{pet, isNewWindow:true}});
      };
      list.push(<List key={i} avatar={{uri:pet.image}} title={pet.name} chevron={true} onPress={handle}/>);
    });
    const title = list.length === 0 ? 'さあ、ペットを登録しましょう' : '飼育中のペット';

    return (
      <ListGroup title={title}>
        {list}
        <List key={-1} icon="pets" iconColor={Colors.brown} title="ペットを登録" chevron={true} border={false}/>
      </ListGroup>
    );
  }

  render() {
    return (
      <View style={{flex:1}}>
        <MarkingNavbar title="marking" left={{icon:'menu', handler:this.props.openMenu}}/>
        <ScrollViewContainer>
          <View style={{flex:0.5}}>
            <View style={{flex:1, flexDirection:'row', marginTop:8, marginLeft:4, marginRight:4}}>
              <TouchableOpacity style={[styles.square, {backgroundColor:Colors.red}]}>
                <Label color={Colors.white} bold={true}>ヘルスケア</Label>
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', marginTop:16}}>
                  <MAIcon name="update" size={72} color={Colors.white}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.square, {backgroundColor:Colors.lightGreen}]}>
                <Label color={Colors.white} bold={true}>お散歩</Label>
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', marginTop:16}}>
                  <MAIcon name="directions-walk" size={72} color={Colors.white}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, flexDirection:'row', marginTop:8, marginLeft:4, marginRight:4}}>
              <TouchableOpacity style={[styles.square, {backgroundColor:Colors.cyan}]}>
                <Label color={Colors.white} bold={true}>マーキング</Label>
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', marginTop:16}}>
                  <MAIcon name="bubble-chart" size={72} color={Colors.white}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.square, {backgroundColor:Colors.blue}]}>
                <Label color={Colors.white} bold={true}>スポット</Label>
                <View style={{alignItems:'flex-end', justifyContent:'flex-end', marginTop:16}}>
                  <MAIcon name="public" size={72} color={Colors.white}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:0.5}}>
            {this.renderPetList()}
            <ListGroup title="ペットたちとの思い出" style={{marginBottom:80}}>
              <List icon="account-balance" iconColor={Colors.purple} title="アーカイブス" chevron={true} border={false}/>
            </ListGroup>
          </View>
        </ScrollViewContainer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    menuState: state.menu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    menuActions: bindActionCreators(Object.assign({}, menuActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuScene);
