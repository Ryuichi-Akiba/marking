import React, {PropTypes} from 'react'
import {StyleSheet, View, Text, ScrollView, Button, TouchableOpacity, TouchableHighlight, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {Actions} from 'react-native-router-flux'
import * as addMyPetFormActions from '../redux/reducers/addMyPetForm'
import * as myPetsActions from '../redux/reducers/myPets'
import PetForm from '../components/pets/PetForm'
import MarkingNavbar from '../components/common/MarkingNavbar'

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  }
});

class AddMyPetForm extends React.Component {
  componentDidMount() {
    this.props.actions.initializeAddMyPetFormContainer();
  }
  componentDidUpdate() {
    if (this.props.state.created) {
      Actions.pop();
    }
  }

  render() {
    const handleSubmit = () => {
      const {petForm} = this.props.form;
      this.props.actions.addMyPet(petForm.values);
    };
    const close = {
      title: 'Cancel',
      handler: Actions.pop,
    };
    const submit = {
      title: 'Save',
      handler: handleSubmit,
    };

    return (
      <View style={styles.container}>
        <MarkingNavbar title="ペットを追加" left={close} right={submit}/>
        <ScrollView>
          <PetForm onSubmit={handleSubmit}/>
        </ScrollView>
      </View>
    );
  }z
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
