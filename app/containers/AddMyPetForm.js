import React, {PropTypes} from "react"
import {StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, Linking} from "react-native"
import {bindActionCreators} from 'redux'
import {connect} from "react-redux"
import {Actions} from 'react-native-router-flux'
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
    borderRadius: 2,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});



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
  }

  render() {
    return (
      <View style={styles.container}>
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
