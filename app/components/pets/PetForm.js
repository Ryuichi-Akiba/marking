import React from 'react'
import {connect} from 'react-redux'
import {ScrollView, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native'
import {Field, reduxForm} from 'redux-form'
import InputField from '../forms/InputField'
import DatePickerField from '../forms/DatePickerField'

const submit = values => {
  console.log('submitting form', values)
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
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

let PetForm = (props) => {
  return (
    <ScrollView>
      <Field name="name" label="名前" component={InputField}/>
      <Field name="nameKana" label="名前（カナ）" component={InputField}/>
      <Field name="birthDate" label="生年月日" component={DatePickerField}/>
      <Field name="kind" label="種類" component={InputField}/>
      <Field name="type" label="品種" component={InputField}/>
      <Field name="color" label="毛色" component={InputField}/>
      <Field name="sex" label="性別" component={InputField}/>

      <TouchableHighlight style={styles.button} onPress={props.onSubmit}>
        <Text>登録する</Text>
      </TouchableHighlight>
    </ScrollView>
  )
};

const validate = (values) => {
  const errors = {};
  console.log(values);
  return errors;
}

PetForm = reduxForm({
  form: 'petForm',
  validate
})(PetForm);

PetForm = connect(
  state => ({
    initialValues: state.addMyPetForm.form
  }),
)(PetForm);

export default PetForm;
