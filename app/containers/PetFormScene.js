import React, {PropTypes} from 'react'
import {StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TouchableHighlight, Linking} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import * as petFormActions from '../redux/reducers/form'
import * as rootActions from '../redux/reducers/root'
import InputField from '../components/forms/InputField'
import DatePickerField from '../components/forms/DatePickerField'
import SelectableListViewField from '../components/forms/SelectableListViewField'
import MarkingNavbar from '../components/common/MarkingNavbar'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import Colors from '../themes/Colors'

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

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  icon: {
    fontSize:24,
    paddingLeft:6,
    paddingRight:6
  }
});

// 性別は固定値にしておく（サーバ側も可変ではないため）
// FIXME ここに定義するのがBESTかは微妙
const genders = [{label:'オス', value:"MALE"}, {label:'メス', value:"FEMALE"}, {label:'不明', value:"NONE"}];

class PetFormScene extends React.Component {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    // map from other scenes
    pet: React.PropTypes.object, // 登録済みのペットを編集する場合は値が入っている
    back: React.PropTypes.func, // 前の画面に戻る際に実行する処理（この処理を経由して前の画面に戻る／登録後もこの処理を経由して前の画面に戻る）
    // map from react-redux
    formState: PropTypes.object,
    formActions: PropTypes.object,
    rootState: PropTypes.object,
    rootActions: PropTypes.object,
    // map from redux-form
    initialize: React.PropTypes.func,
    reduxFormState: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {image:null, pet:null};
  }

  componentWillMount() {
    // ペットフォームを初期化する
    // TODO 処理の順序がオカシイのでリファクタリングすべきかもしれない
    this.props.formActions.initialize();
    this.initializeForm(this.props.pet ? this.props.pet : {});
  }

  componentWillReceiveProps(nextProps) {
    // ペット情報を保存した場合の遷移先を定義する
    if (nextProps.formState.created !== this.props.formState.created) {
      // 戻る処理が定義されていれば、その画面に戻す
      if (nextProps.formState.created) {
        nextProps.formActions.clear();
        if (nextProps.back) {
          nextProps.back(this.state.pet);
        } else {
          nextProps.navigator.replace({name:'HomeScene', props:{message: this.state.pet.name + 'を登録しました。'}});
        }
      }
    }
  }

  // RESTで取得したオブジェクトとフォームのオブジェクトの型が異なる部分があるため、ここでフォーム用に整形する
  initializeForm(pet) {
    if (pet.sex) {
      const exists = genders.filter((gender) => gender.value === pet.sex);
      if (exists.length !== 0) {
        pet.sex = exists[0];
      }
    }
    if (pet.image) {
      this.setState({image:{uri:pet.image}});
    }
    this.props.initialize(pet);
  }

  createNavbar() {
    // 戻る処理が定義されていれば、その処理を経由して戻るし、そうでなければホーム画面に戻す
    const leftConfig = {icon:'arrow-back', handler:() => this.props.back ? this.props.back(this.props.pet) : this.props.navigator.replace({name:'HomeScene'})};
    const rightConfig = {title:'保存', handler:this.save.bind(this)};
    const title = !!this.props.pet ? 'ペットを編集' : 'ペットを登録';
    return <MarkingNavbar title={title} left={leftConfig} right={rightConfig}/>;
  }

  transform(values) {
    // APIに合うようにフォームをトランスフォームする
    values.sex = values.sex.value;
    values.user = {};
    values.kind = values.breed.kind;
    values.type = values.breed.type;
    return values;
  }

  save() {
    this.props.submit();

    if (this.props.valid) {
      // バリデーションエラーではないので保存する
      const {petForm} = this.props.reduxFormState;
      var values = Object.assign({}, petForm.values);
      values.image = this.state.image;
      const pet = this.transform(values);
      this.props.formActions.addMyPet(pet);
      this.setState({pet});
    } else {
      // 入力エラーがあるのでエラーにする
      const {petForm} = this.props.reduxFormState;
      if (petForm) {
        const values = petForm.syncErrors;
        const keys = Object.keys(values);
        var errors = [];
        keys.forEach((key) => {
          errors.push({detail:values[key]});
        });
        console.log(errors);
        this.props.rootActions.showErrors(errors);
      }
    }
  }

  pick() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true
    }).then(image => {
      console.log(image);
      this.setState({image:{uri:`data:${image.mime};base64,`+ image.data, width:image.width, height:image.height, mime:image.mime}});
    });
  }

  render() {
    const colors = this.props.formState.colors;
    const breeds = this.props.formState.breeds;

    var image = <View style={[styles.avatar, {alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF'}]}><MAIcon name="photo" size={48} style={{color:'#BDBDBD'}}/></View>;
    if (this.state.image) {
      image = <Image style={styles.avatar} source={this.state.image}/>;
    }

    return (
      <View style={styles.container}>
        {this.createNavbar()}
        <ScrollViewContainer>
          <View style={{alignItems:'center', justifyContent:'center', marginTop:32}}>
            {image}
          </View>
          <TouchableOpacity onPress={() => this.pick()} style={{marginTop:10, alignItems:'center', justifyContent:'center'}}>
            <Text>画像を選択する</Text>
          </TouchableOpacity>
          <ListGroup>
            <Field icon="pets" name="name" placeholder="ペットの名前" component={InputField}/>
            <Field icon="message" name="profile" placeholder="ペットのプロフィール" component={InputField} border={false}/>
          </ListGroup>
          <ListGroup>
            <Field icon="date-range" name="birthDate" placeholder="ペットの生年月日" component={DatePickerField}/>
            <Field icon="folder-open" name="breed" placeholder="ペットの品種" component={SelectableListViewField} navigator={this.props.navigator} data={breeds} converter={(value) => value.kind + ':' + value.type} search={true}/>
            <Field icon="invert-colors" name="color" placeholder="ペットの色" component={SelectableListViewField} navigator={this.props.navigator} data={colors} search={true}/>
            <Field icon="wc" name="sex" placeholder="ペットの性別" component={SelectableListViewField} navigator={this.props.navigator} data={genders} converter={(value) => value.label} border={false}/>
          </ListGroup>
        </ScrollViewContainer>
      </View>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'ペットの名前を入力してください。';
  }
  if (!values.birthDate) {
    errors.birthDate = 'ペットの生年月日を入力してください。';
  }
  if (!values.breed) {
    errors.breed = 'ペットの品種を入力してください。';
  }
  if (!values.color) {
    errors.color = 'ペットの色を入力してください。';
  }
  if (!values.sex) {
    errors.sex = 'ペットの性別を入力してください。';
  }
  return errors;
};

PetFormScene = reduxForm({
  form: 'petForm',
  validate,
  onSubmit: () => {}
})(PetFormScene);

function mapStateToProps(state) {
  return {
    formState: state.petForm,
    rootState: state.root,
    reduxFormState: state.form,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    formActions: bindActionCreators(Object.assign({}, petFormActions), dispatch),
    rootActions:  bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetFormScene);
