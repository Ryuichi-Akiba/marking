import React, {PropTypes} from 'react'
import {StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TouchableHighlight, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import { List, ListItem } from 'react-native-elements'
import * as addMyPetFormActions from '../redux/reducers/addMyPetForm'
import * as rootActions from '../redux/reducers/root'
import InputField from '../components/forms/InputField'
import DatePickerField from '../components/forms/DatePickerField'
import SelectableListViewField from '../components/forms/SelectableListViewField'
import MarkingNavbar from '../components/common/MarkingNavbar'

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  form: {
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
  },

  icon: {
    fontSize:24,
    paddingLeft:6,
    paddingRight:6
  }
});

class PetFormScene extends React.Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    petFormState: PropTypes.object,
    rootState: PropTypes.object,
    reduxFormState: PropTypes.object,
    initialValues: PropTypes.object,
    myPetFormActions: PropTypes.object,
    rootActions: PropTypes.object,
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

  componentDidMount() {
    // ペットフォームを初期化する
    this.props.myPetFormActions.initialize(true);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.state.created !== this.props.state.created) {
  //     nextProps.navigator.push({
  //       name: 'MarkingMap'
  //     });
  //   }
  // }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.petFormState !== this.props.petFormState) {
      if (nextProps.petFormState.created) {
        // console.log(this.props);
        // this.props.resetForm();
        this.props.rootActions.destroyLoadingScene(); // FIXME 本来ならば、Map側のページの初期化処理終了後にこれを行うべきだが、競合しそうなので今はここに書いておく
        this.props.navigator.replace({
          name: 'Map'
        });
      }
    }
  }

  render() {
    const handleSaveEvent = {
      title: 'Save',
      handler: () => {
        const {petForm} = this.props.form;
        console.log(petForm);
        this.props.myPetFormActions.addMyPet(petForm.values);
      },
    };

    const handleSkipEvent = {
      title: 'Skip',
      handler: () => {
        this.props.navigator.replace({
          name: 'Map'
        });
      }
    };

    // temporary
    const temp = <List>
      <ListItem leftIcon={{name:'pets', style:styles.icon}} title={
              <Field name="name" label="名前" placeholder="ペットの名前" component={InputField}/>
            } hideChevron={true}/>
      <ListItem leftIcon={{name:'pets', style:styles.icon}} title={
              <Field name="name" label="名前" placeholder="ペットの名前" component={InputField}/>
            } hideChevron={true}/>

      <ListItem
        roundAvatar
        title='Limited supply! Its like digital gold!'
        subtitle={
                <View style={styles.subtitleView}>
                  {/*<Image source={require('./images/login.jpg')}/>*/}
                  <Text style={styles.ratingText}>5 months ago</Text>
                </View>
              }
        avatar={require('./images/login.jpg')}
      />
    </List>;

    return (
      <View style={styles.container}>
        <MarkingNavbar title="ペットを追加" left={handleSkipEvent} right={handleSaveEvent}/>
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.field}>
              <Field name="name" label="名前" placeholder="ペットの名前" icon="pets" component={InputField}/>
            </View>
            <View style={styles.field}>
              <Field name="birthDate" label="生年月日" component={DatePickerField} icon="date-range" placeholder="生年月日"/>
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
        </ScrollView>
      </View>
    );
  }
}

const validate = (values) => {
  console.log(values);
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

PetFormScene = reduxForm({
  form: 'petForm',
  validate
})(PetFormScene);

function mapStateToProps(state) {
  return {
    petFormState: state.addMyPetForm,
    rootState: state.root,
    reduxFormState: state.form,
    initialValues: state.addMyPetForm.form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    myPetFormActions: bindActionCreators(Object.assign({}, addMyPetFormActions), dispatch),
    rootActions:  bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetFormScene);
