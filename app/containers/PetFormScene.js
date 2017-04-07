import React, {PropTypes} from 'react'
import {StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TouchableHighlight, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {ListItem } from 'react-native-elements'
import * as addMyPetFormActions from '../redux/reducers/addMyPetForm'
import * as rootActions from '../redux/reducers/root'
import InputField from '../components/forms/InputField'
import DatePickerField from '../components/forms/DatePickerField'
import SelectableListViewField from '../components/forms/SelectableListViewField'
import MarkingNavbar from '../components/common/MarkingNavbar'
import NavbarIcon from '../components/common/NavbarIcon'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'

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
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    force: React.PropTypes.bool, // 登録フォームを表示可能か否かのBOOL値（falseの場合は、1匹もペットが登録されていない時のみ表示可能）FIXME よく考えると不要になる可能性あり
    isNewWindow: React.PropTypes.bool, // 別画面で開いている場合はTRUE（設定画面から来た場合はこれがTRUEになっている）
    // map from react-redux
    petFormState: PropTypes.object,
    myPetFormActions: PropTypes.object,
    rootState: PropTypes.object,
    rootActions: PropTypes.object,
    // map from redux-form
    reduxFormState: PropTypes.object,
    initialValues: PropTypes.object,
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
    this.props.petFormActions.initialize(!this.props.force);
    if (!this.props.isNewWindow) {
      this.props.rootActions.destroyLoadingScene();
    }
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

  createNavbar() {
    var leftConfig;
    if (this.props.isNewWindow) {
      leftConfig = <NavbarIcon icon="chevron-left" onPress={this.props.navigator.pop}/>;
    } else {
      leftConfig = <NavbarIcon icon="clear" onPress={() => this.props.navigator.replace({name:'Map'})}/>;
    }

    var rightConfig;
    if (this.props.isNewWindow) {
      rightConfig = {
        title: '保存',
        handler: () => {
          const {petForm} = this.props.form;
          console.log(petForm);
          this.props.petFormActions.addMyPet(petForm.values);
        },
      };
    } else {
      rightConfig = {
        title: '保存',
        handler: () => {
          const {petForm} = this.props.form;
          console.log(petForm);
          this.props.petFormActions.addMyPet(petForm.values);
        },
      };
    }

    return <MarkingNavbar title="ペットを登録" left={leftConfig} right={rightConfig}/>;
  }

  render() {
    // TODO とりあえず（本当はRESTから取得する）
    const kinds = ["犬", "猫", "ハムスター", "フェレット", "とかげ", "へび"];
    const colors = ["茶・ブラウン", "黒・ブラック", "白・ホワイト", "鼠・グレー"];
    const genders = ["MALE", "FEMALE", "NONE"];

    return (
      <View style={styles.container}>
        {this.createNavbar()}
        <ScrollViewContainer>
          <ListGroup>
            <Field icon="pets" name="name" placeholder="ペットの名前" component={InputField}/>
            <Field icon="message" name="profile" placeholder="ペットのプロフィール" component={InputField} border={false}/>
          </ListGroup>
          <ListGroup>
            <Field icon="date-range" name="birthDate" placeholder="ペットの生年月日" component={DatePickerField}/>
            <Field icon="folder-open" name="type" placeholder="ペットの品種" component={SelectableListViewField} navigator={this.props.navigator} data={kinds}/>
            <Field icon="invert-colors" name="color" placeholder="ペットの色" component={SelectableListViewField} navigator={this.props.navigator} data={colors}/>
            <Field icon="wc" name="sex" placeholder="ペットの性別" component={SelectableListViewField} navigator={this.props.navigator} data={genders} border={false}/>
          </ListGroup>
        </ScrollViewContainer>
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
    petFormActions: bindActionCreators(Object.assign({}, addMyPetFormActions), dispatch),
    rootActions:  bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetFormScene);
