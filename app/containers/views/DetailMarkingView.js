import moment from 'moment'
import React from 'react'
import {Navigator, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MapView from 'react-native-maps'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import * as rootActions from '../redux/reducers/root'
import * as archivesActions from '../redux/reducers/archives'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import Label from '../components/elements/Label'
import MarkingNavbar from '../components/common/MarkingNavbar'
import Colors from '../themes/Colors'

class DetailMarkingView extends React.PureComponent {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    // map from react-redux
    rootState: React.PropTypes.object,
    rootActions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <MarkingNavbar title="マーキング" left={{icon:'arrow-back', handler:() => this.props.navigator.replace({name:'HomeScene'})}}/>
        <View style={{flex:1}}>
          <MapView style={{...StyleSheet.absoluteFillObject}}/>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootState: state.root,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rootActions: bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkingScene);
