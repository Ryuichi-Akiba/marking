import React, {PropTypes} from 'react'
import {StyleSheet, View, Text, ScrollView, Button, TouchableOpacity, TouchableHighlight, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as addMyPetFormActions from '../redux/reducers/addMyPetForm'
import * as myPetsActions from '../redux/reducers/myPets'
import PetForm from './PetForm'
import MarkingNavbar from '../components/common/MarkingNavbar'

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  }
});

class AddMyPetForm extends React.Component {
  static propTypes = {
    drawer: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.initializeAddMyPetFormContainer();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.state.created !== this.props.state.created) {
  //     nextProps.navigator.push({
  //       name: 'MarkingMap'
  //     });
  //   }
  // }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.state !== this.props.state) {
      if (nextProps.state.created) {
        nextProps.navigator.push({
          name: 'Map'
        });
      }
    }
  }
  // componentDidUpdate() {
  //   if (this.props.state.created) {
  //     this.props.navigator.push({
  //       name: 'MarkingMap'
  //     });
  //   }
  // }

  render() {
    const handleSaveEvent = {
      title: 'Save',
      handler: () => {
        const {petForm} = this.props.form;
        this.props.actions.addMyPet(petForm.values);
      },
    };

    return (
      <View style={styles.container}>
        <MarkingNavbar title="ペットを追加" drawer={this.props.drawer} right={handleSaveEvent}/>
        <ScrollView>
          <PetForm navigator={this.props.navigator}/>
        </ScrollView>
      </View>
    );
  }
}

AddMyPetForm.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    state: state.addMyPetForm,
    form: state.form,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, addMyPetFormActions, myPetsActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMyPetForm);
