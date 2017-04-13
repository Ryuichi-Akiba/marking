import React, {PropTypes} from 'react'
import {StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TouchableHighlight, Linking, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import * as addMyPetFormActions from '../redux/reducers/addMyPetForm'
import * as rootActions from '../redux/reducers/root'
import InputField from '../components/forms/InputField'
import DatePickerField from '../components/forms/DatePickerField'
import SelectableListViewField from '../components/forms/SelectableListViewField'
import MarkingNavbar from '../components/common/MarkingNavbar'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import MessageContainer from '../components/forms/MessageContainer'

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
    this.state = {click:0, image:null};
  }

  componentDidMount() {
    // ペットフォームを初期化する
    this.props.petFormActions.initialize(!this.props.force);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.petFormState !== this.props.petFormState) {
      // 初回ロード時
      if (nextProps.petFormState.skip) {
        this.props.rootActions.destroyLoadingScene(); // FIXME 本来ならば、Map側のページの初期化処理終了後にこれを行うべきだが、競合しそうなので今はここに書いておく
        this.props.navigator.replace({
          name: 'Map'
        });
      }

      // 新しくペットを登録した場合の遷移先を定義する
      if (nextProps.petFormState.created) {
        if (this.props.isNewWindow) {
          this.props.navigator.pop();
        } else {
          this.props.navigator.replace({name:'Map'});
        }
      }
    }
  }

  createNavbar() {
    var leftConfig;
    if (this.props.isNewWindow) {
      leftConfig = {icon:'chevron-left', handler:this.props.navigator.pop};
    } else {
      leftConfig = {icon:'clear', handler:() => this.props.navigator.replace({name:'Map'})};
    }

    const rightConfig = {title:'保存', handler:this.save.bind(this)};
    return <MarkingNavbar title="ペットを登録" left={leftConfig} right={rightConfig}/>;
  }

  save() {
    this.props.submit();

    if (this.props.valid) {
      const {petForm} = this.props.reduxFormState;
      var values = petForm.values;
      values.image = this.state.image;
      this.props.petFormActions.addMyPet(values);
    } else {
      this.setState({click: ++this.state.click});
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
    // TODO とりあえず（本当はRESTから取得する）
    const kinds = ["犬", "猫", "ハムスター", "フェレット", "とかげ", "へび"];
    const colors = ["茶・ブラウン", "黒・ブラック", "白・ホワイト", "鼠・グレー"];
    const genders = [{label:'オス', value:"MALE"}, {label:'メス', value:"FEMALE"}, {label:'不明', value:"NONE"}];

    const {petForm} = this.props.reduxFormState;
    var errors = null;
    if (petForm) {
      errors = petForm.syncErrors;
    }

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
            <Field icon="folder-open" name="type" placeholder="ペットの品種" component={SelectableListViewField} navigator={this.props.navigator} data={kinds}/>
            <Field icon="invert-colors" name="color" placeholder="ペットの色" component={SelectableListViewField} navigator={this.props.navigator} data={colors}/>
            <Field icon="wc" name="sex" placeholder="ペットの性別" component={SelectableListViewField} navigator={this.props.navigator} data={genders} converter={(value) => value.label} border={false}/>
          </ListGroup>
          <MessageContainer errors={errors} notify={this.state.click}/>
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
  if (!values.type) {
    errors.type = 'ペットの品種を入力してください。';
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
