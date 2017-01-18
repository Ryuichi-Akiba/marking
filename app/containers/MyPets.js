import React, {Component, PropTypes} from "react";
import {View, TouchableOpacity, AppRegistry, ListView} from "react-native";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
import {Container, Content, List, ListItem, Thumbnail, Text} from 'native-base';
import Styles from '../themes/Styles';

class MyPets extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

  render() {
    return (
      // <View style={[Styles.container, {marginTop:60}]}>
      //   <ListView
      //     dataSource={this.state.dataSource}
      //     renderRow={(rowData) => <Text>{rowData}</Text>}
      //   />
      // </View>
      <Container style={{marginTop:62}}>
        <Content>
          <List>
            <ListItem>
              <Thumbnail size={42} source={{uri:'http://i.imgur.com/ASj60DP.jpg'}} />
              <Text>Kumar Pratik</Text>
              <Text note>Doing what you like will always keep you happy . .</Text>
            </ListItem>
            <ListItem>
              <Thumbnail size={42} source={{uri:'http://i.imgur.com/ASj60DP.jpg'}} />
              <Text>Kumar Pratik</Text>
              <Text note>Doing what you like will always keep you happy . .</Text>
            </ListItem>
            <ListItem>
              <Thumbnail size={42} source={{uri:'http://i.imgur.com/ASj60DP.jpg'}} />
              <Text>Kumar Pratik</Text>
              <Text note>Doing what you like will always keep you happy . .</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPets);
