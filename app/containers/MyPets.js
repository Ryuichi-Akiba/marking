import React from 'react'
import {View, TouchableOpacity, AppRegistry, ListView} from 'react-native'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux';
import {Container, Content, List, ListItem, Thumbnail, Text} from 'native-base';
import * as myPetsActions from '../redux/reducers/myPets'
import PetListView from '../components/pets/PetListView'

class MyPets extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state = {
  //     dataSource: ds.cloneWithRows([
  //       'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
  //     ])
  //   };
  // }

  componentDidMount() {
    this.props.actions.initializeMyPetsContainer();
  }

  render() {
    const {state, actions} = this.props;
    const handlePress = function(id, data) {
      // TODO 詳細画面にリンクするように
      console.log(id);
      console.log(data);
    };

    return (
      <View style={{marginTop:62}}>
        <PetListView pets={state.pets} onClick={handlePress}/>
      </View>
    );
  }
}

MyPets.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    state: state.myPets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, myPetsActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(MyPets);
