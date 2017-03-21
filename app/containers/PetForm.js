import React from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native'
import {Field, reduxForm} from 'redux-form'
import InputField from '../components/forms/InputField'
import DatePickerField from '../components/forms/DatePickerField'
import SelectableListViewField from '../components/forms/SelectableListViewField'

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
  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {selectedKind:null,  selectedGender:null, selectedColor:null};
  }

  handlePressSelectText(data, handler) {
    this.props.navigator.push({
      name: 'SelectableListViewScene',
      passProps: {
        data: data,
        onSelect: handler
      }
    });
  }
  handlePressKindText() {
    // FIXME とりあえず仮で
    const kind = ["犬", "猫", "ハムスター", "フェレット", "とかげ", "へび"];
    const handler = (value) => {
      this.setState({selectedKind: value});
      this.props.navigator.pop();
    };
    this.handlePressSelectText(kind, handler);
  }
  handlePressGenderText() {
    // FIXME とりあえず仮で
    const gender = ["MALE", "FEMALE", "NONE"];
    const handler = (value) => {
      this.setState({selectedGender: value});
      this.props.navigator.pop();
    };
    this.handlePressSelectText(gender, handler);
  }
  handlePressColorText() {
    // FIXME とりあえず仮で
    const color = ["茶・ブラウン", "黒・ブラック", "白・ホワイト", "鼠・グレー"];
    const handler = (value) => {
      this.setState({selectedColor: value});
      this.props.navigator.pop();
    };
    this.handlePressSelectText(color, handler);
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.field}>
            <Field name="name" label="名前" placeholder="ペットの名前" icon="pets" component={InputField}/>
          </View>
          <View style={styles.field}>
            <Field name="birthDate" label="生年月日" component={DatePickerField} icon="today" placeholder="生年月日"/>
          </View>
          <View style={styles.field}>
            <Field name="type" label="品種" component={SelectableListViewField} onPress={this.handlePressKindText.bind(this)} selected={this.state.selectedKind} icon="assignment" placeholder="ペットの品種"/>
          </View>
          <View style={styles.field}>
            <Field name="color" label="毛色" component={SelectableListViewField} onPress={this.handlePressColorText.bind(this)} selected={this.state.selectedColor} icon="invert-colors" placeholder="毛の色"/>
          </View>
          <View style={styles.field}>
            <Field name="sex" label="性別" component={SelectableListViewField} onPress={this.handlePressGenderText.bind(this)} selected={this.state.selectedGender} icon="wc" placeholder="性別"/>
          </View>
        </View>

      </View>
    )
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'required name field';
  }
  if (!values.birthDate) {
    errors.birthDate = 'required birthDate field';
  }
  if (!values.type) {
    errors.type = 'required type field';
  }
  if (!values.color) {
    errors.color = 'required color field';
  }
  if (!values.sex) {
    errors.sex = 'required sex field';
  }
  console.log(values);
  console.log(errors);
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
