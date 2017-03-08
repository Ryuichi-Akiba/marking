import React from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native'
import {Field, reduxForm} from 'redux-form'
import InputField from '../forms/InputField'
import DatePickerField from '../forms/DatePickerField'
import SelectableListViewField from '../forms/SelectableListViewField'

const submit = values => {
  console.log('submitting form', values)
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  field: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 0.5,
    padding: 5,
    marginLeft: 10,
  },
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

class PetForm extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // FIXME とりあえず仮で
    const kind = ["犬", "猫", "ハムスター", "フェレット", "とかげ", "へび"];
    const gender = ["オス", "メス", "不明"];
    const color = ["茶・ブラウン", "黒・ブラック", "白・ホワイト", "鼠・グレー"];
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.field}>
            <Field name="name" label="名前" placeholder="ペットの名前" icon="pets" component={InputField}/>
          </View>
          <View style={styles.field}>
            <Field name="birthDate" label="生年月日" component={DatePickerField}/>
          </View>
          <View style={styles.field}>
            <Field name="type" label="品種" component={SelectableListViewField} data={kind} icon="assignment" placeholder="ペットの品種"/>
          </View>
          <View style={styles.field}>
            <Field name="color" label="毛色" component={SelectableListViewField} data={color} icon="invert-colors" placeholder="毛の色"/>
          </View>
          <View style={styles.field}>
            <Field name="sex" label="性別" component={SelectableListViewField} data={gender} icon="wc" placeholder="性別"/>
          </View>
        </View>
      </View>
    )
  }
}

const validate = (values) => {
  const errors = {};
  console.log(values);
  return errors;
};

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
