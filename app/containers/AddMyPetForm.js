import React, {PropTypes} from "react"
import {StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, Linking} from "react-native"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {Actions} from 'react-native-router-flux'
import form from'tcomb-form-native';
import * as homeActions from '../redux/reducers/home';

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
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});



var Form = form.form.Form;

class AddMyPetForm extends React.Component {
  static propTypes: {
    form: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  onPress() {
    console.log(this.props);
    console.log(this.refs);
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    var Person = form.struct({
      name: form.String,              // a required string
      surname: form.maybe(form.String),  // an optional string
      age: form.Number,               // a required number
      rememberMe: form.Boolean        // a boolean
    });
    var options = {}; // optional rendering options (see documentation)

    return (
      <View style={styles.container}>
        <Form ref="form" type={Person} options={options}/>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

// AddMyPetForm.propTypes = {
//   state: PropTypes.object,
//   actions: PropTypes.object
// };
//
// function mapStateToProps(state) {
//   return {
//     state: state.home
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(Object.assign({}, homeActions), dispatch)
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddMyPetForm);

export default AddMyPetForm
