import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as rootActions from '../redux/reducers/root'
import * as archivesActions from '../redux/reducers/archives'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import MarkingNavbar from '../components/common/MarkingNavbar'

class ArchiveScene extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
    archivesState: React.PropTypes.object,
    archivesActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    // 画面を初期化する
    this.props.archivesActions.initialize();
  }

  renderArchivedPets() {
    const size = this.props.archivesState.pets.length;
    var list = [];
    this.props.archivesState.pets.forEach((pet, i) => {
      const handle = () => {
        this.props.navigator.push({name:'PetDetailScene', props:{pet, isNewWindow:true}});
      };
      const subtitle = moment(pet.lastModifiedDate).format('YYYY年MM月DD日没') + '  ' + pet.type;
      const border = size - 1 === i ? false : true;
      list.push(<List key={i} avatar={{uri:pet.image}} title={pet.name} subtitle={subtitle} chevron={true} onPress={handle} border={border}/>);
    });

    if (list.length === 0) {
      return null;
    }

    return (
      <ListGroup title="アーカイブしたペットたちとの思い出">
        {list}
      </ListGroup>
    );
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <MarkingNavbar title="アーカイブス" left={{icon:'menu', handler:this.props.openMenu}}/>
        <ScrollViewContainer>
          {this.renderArchivedPets()}
        </ScrollViewContainer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
    archivesState: state.archives,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
    archivesActions: bindActionCreators(Object.assign({}, archivesActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveScene);