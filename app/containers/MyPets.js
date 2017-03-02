import React from 'react'
import {View, TouchableOpacity, AppRegistry, ListView} from 'react-native'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux';
import {Container, Content, List, ListItem, Thumbnail, Text} from 'native-base';
import * as myPetsActions from '../redux/reducers/myPets';

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

  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource
    }
  }

  componentDidMount() {
    this.props.actions.initializeMyPetsContainer();
    console.log(this.props.state.pets);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.props.state.pets)
    })
    console.log(this.props.state.pets);
  }

  render() {
    const {state, actions} = this.props;
    console.log(state.pets);
    console.log(this.state);

    return (
      <View style={{marginTop:60}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
      // <Container style={{marginTop:62}}>
      //   <Content>
      //     <List>
      //       <ListItem>
      //         <Thumbnail size={42} source={{uri:'http://i.imgur.com/ASj60DP.jpg'}} />
      //         <Text>Kumar Pratik</Text>
      //         <Text note>Doing what you like will always keep you happy . .</Text>
      //       </ListItem>
      //       <ListItem>
      //         <Thumbnail size={42} source={{uri:'http://i.imgur.com/ASj60DP.jpg'}} />
      //         <Text>Kumar Pratik</Text>
      //         <Text note>Doing what you like will always keep you happy . .</Text>
      //       </ListItem>
      //       <ListItem>
      //         <Thumbnail size={42} source={{uri:'http://i.imgur.com/ASj60DP.jpg'}} />
      //         <Text>Kumar Pratik</Text>
      //         <Text note>Doing what you like will always keep you happy . .</Text>
      //       </ListItem>
      //     </List>
      //   </Content>
      // </Container>
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
