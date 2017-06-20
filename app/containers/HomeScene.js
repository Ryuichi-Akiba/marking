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

class HomeScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    menuState: React.PropTypes.object,
    menuActions: React.PropTypes.object,
    // map from other route
    message: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    // 最初に必ず来るシーンのため、ルートにあるローディングを常時OFFにして始める
    this.props.rootActions.destroyLoadingScene();

    // メッセージがセットされているのであれば、最初にそれを表示する
    if (!!this.props.message) {
      this.props.rootActions.showMessage(this.props.message.message);
    }
  }

  renderPetList() {
    var list = [];
    this.props.menuState.pets.forEach((pet, i) => {
      const handle = () => {
        this.props.navigator.push({name:'DetailScene', props:{pet, isNewWindow:true}});
      };
      list.push(<List key={i} avatar={{uri:pet.image}} title={pet.name} chevron={true} onPress={handle}/>);
    });
    const title = list.length === 0 ? 'さあ、ペットを登録しましょう' : '飼育中のペット';

    return (
      <ListGroup title={title}>
        {list}
        <List key={-1} icon="pets" iconColor={Colors.brown} title="ペットを登録" chevron={true} border={false} onPress={() => this.props.navigator.push({name:'PetFormScene', props:{force:true, isNewWindow:true}})}/>
      </ListGroup>
    );
  }

  renderPanel(icon: string, title: string, color: string, handler: any) {
    return (
      <TouchableOpacity style={[styles.square, {backgroundColor:color}]} onPress={handler}>
        <Label color={Colors.white} bold={true}>{title}</Label>
        <View style={{alignItems:'flex-end', justifyContent:'flex-end', marginTop:16}}>
          <MAIcon name={icon} size={72} color={Colors.white}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex:1}}>
        <MarkingNavbar title="marking" left={{icon:'menu', handler:this.props.openMenu}}/>
        <ScrollViewContainer>
          <View style={{flex:0.5}}>
            <View style={{flex:1, flexDirection:'row', marginTop:8, marginLeft:4, marginRight:4}}>
              {this.renderPanel('update', 'ヘルスケア', Colors.red, () => this.props.navigator.replace({name:'HealthScene'}))}
              {this.renderPanel('directions-walk', 'お散歩', Colors.lightGreen, () => this.props.navigator.replace({name:'WalkingSelectScene'}))}
            </View>
            <View style={{flex:1, flexDirection:'row', marginTop:8, marginLeft:4, marginRight:4}}>
              {this.renderPanel('bubble-chart', 'マーキング', Colors.cyan, () => this.props.navigator.replace({name:'MarkingScene'}))}
              {this.renderPanel('public', 'スポット', Colors.blue, () => this.props.navigator.replace({name:'SpotScene'}))}
            </View>
          </View>
          <View style={{flex:0.5}}>
            {this.renderPetList()}
            <ListGroup title="ペットたちとの思い出" style={{marginBottom:80}}>
              <List icon="account-balance" iconColor={Colors.purple} title="アーカイブス" chevron={true} border={false} onPress={() => this.props.navigator.replace({name:'ArchivesScene'})}/>
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
)(HomeScene);
