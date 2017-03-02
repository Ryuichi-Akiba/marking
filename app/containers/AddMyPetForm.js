import React, {PropTypes} from 'react'
import {StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {Actions} from 'react-native-router-flux'
import * as addMyPetFormActions from '../redux/reducers/addMyPetForm'
import PetForm from '../components/pets/PetForm'

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});



class AddMyPetForm extends React.Component {
  componentDidMount() {
    this.props.actions.initializeAddMyPetFormContainer();
  }

  render() {
    const handleSubmit = () => {
      const {petForm} = this.props.form;
      console.log(petForm.values);
    };

    return (
      <View style={styles.container}>
        <PetForm onSubmit={handleSubmit}/>
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
    actions: bindActionCreators(Object.assign({}, addMyPetFormActions), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMyPetForm);
