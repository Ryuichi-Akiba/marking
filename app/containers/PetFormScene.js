import React, {PropTypes} from 'react'
import {StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TouchableHighlight, Linking, Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import * as addMyPetFormActions from '../redux/reducers/addMyPetForm'
import * as petDetailActions from '../redux/reducers/petDetail'
import * as rootActions from '../redux/reducers/root'
import InputField from '../components/forms/InputField'
import DatePickerField from '../components/forms/DatePickerField'
import SelectableListViewField from '../components/forms/SelectableListViewField'
import MarkingNavbar from '../components/common/MarkingNavbar'
import ScrollViewContainer from '../components/common/ScrollViewContainer'
import ListGroup from '../components/elements/ListGroup'
import List from '../components/elements/List'
import MessageContainer from '../components/forms/MessageContainer'
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
const genders = [{label:'オス', value:"MALE"}, {label:'メス', value:"FEMALE"}, {label:'不明', value:"NONE"}];

class PetFormScene extends React.Component {
  static propTypes = {
    // map from route navigation
    navigator: React.PropTypes.object.isRequired,
    force: React.PropTypes.bool, // 登録フォームを表示可能か否かのBOOL値（falseの場合は、1匹もペットが登録されていない時のみ表示可能）FIXME よく考えると不要になる可能性あり
    isNewWindow: React.PropTypes.bool, // 別画面で開いている場合はTRUE（設定画面から来た場合はこれがTRUEになっている）
    pet: React.PropTypes.object, // 登録済みのペットを編集する場合は値が入っている
    // map from react-redux
    petFormState: PropTypes.object,
    petFormActions: PropTypes.object,
    rootState: PropTypes.object,
    rootActions: PropTypes.object,
    // map from redux-form
    initialize: React.PropTypes.func,
    reduxFormState: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {click:0, image:null, pet:null};
  }

  componentWillMount() {
    // ペットフォームを初期化する
    if (this.props.isNewWindow) {
      this.props.petFormActions.initializePetForm(this.props.pet);
      this.initializeForm(this.props.pet ? this.props.pet : {});
    } else {
      this.props.petFormActions.initializeSkipPetForm();
    }
  }

  componentWillReceiveProps(nextProps) {
    // 初回ロード時
    if (nextProps.petFormState.skip !== this.props.petFormState.skip) {
      if (nextProps.petFormState.skip) {
        this.props.navigator.replace({
          name: 'Map'
        });
      }
    }

    // ペット情報を保存した場合の遷移先を定義する
    if (nextProps.petFormState.created !== this.props.petFormState.created) {
      if (this.props.isNewWindow) {
        // TODO 本来ならコールバックにして入れ替えたほうが軽くて良い
        const pet = nextProps.petFormState.updated;
        nextProps.navigator.replace({name:'PetDetailScene', props:{pet}});
      } else {
        nextProps.navigator.replace({name:'Map'});
      }
    }

    // アーカイブされた場合に呼び出される
    if (nextProps.petFormState.archived !== this.props.petFormState.archived) {
      if (nextProps.petFormState.archived) {
        // TODO 共通処理してアーカイブした旨の表示したい
        const pet = nextProps.petFormState.updated;
        nextProps.navigator.replace({name:'PetDetailScene', props:{pet}});
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
    var leftConfig;
    if (this.props.isNewWindow) {
      leftConfig = {icon:'arrow-back', handler:this.props.navigator.pop};
    } else {
      leftConfig = {icon:'clear', handler:() => this.props.navigator.replace({name:'Map'})};
    }

    const rightConfig = {title:'保存', handler:this.save.bind(this)};
    const title = !!this.props.pet ? 'ペットを編集' : 'ペットを登録';
    return <MarkingNavbar title={title} left={leftConfig} right={rightConfig}/>;
  }

  trunsform(values) {
    // APIに合うようにフォームをトランスフォームする
    values.sex = values.sex.value;
    values.user = {};
    return values;
  }

  save() {
    this.props.submit();

    if (this.props.valid) {
      const {petForm} = this.props.reduxFormState;
      var values = petForm.values;
      values.image = this.state.image;
      const pet = this.trunsform(values);
      this.props.petFormActions.addMyPet(pet);
      this.setState({pet});
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

  handleArchiveLink() {
    Alert.alert('アーカイブしますか？', '思い出になったペットをアーカイブします。アーカイブすると新しくマーキング記録できなくなります。', [
      {text: 'キャンセル', style: 'cancel'},
      {text: 'アーカイブ', onPress: () => this.props.petFormActions.archivePet(this.props.pet)},
    ]);
  }

  renderOther() {
    // 登録画面の時は表示しない
    if (!this.props.pet || !this.props.pet.id) {
      return null;
    }

    return (
      <ListGroup title="アーカイブ">
        <List icon="account-balance" iconColor={Colors.red} title="アーカイブ（思い出）にする" border={false} onPress={this.handleArchiveLink.bind(this)}/>
      </ListGroup>
    );
  }

  render() {
    // TODO とりあえず（本当はRESTから取得する）
    const kinds = ["犬", "猫", "ハムスター", "フェレット", "とかげ", "へび"];
    const colors = ["茶・ブラウン", "黒・ブラック", "白・ホワイト", "鼠・グレー"];

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
            <Field icon="folder-open" name="type" placeholder="ペットの品種" component={SelectableListViewField} navigator={this.props.navigator} data={kinds} search={true}/>
            <Field icon="invert-colors" name="color" placeholder="ペットの色" component={SelectableListViewField} navigator={this.props.navigator} data={colors} search={true}/>
            <Field icon="wc" name="sex" placeholder="ペットの性別" component={SelectableListViewField} navigator={this.props.navigator} data={genders} converter={(value) => value.label} border={false}/>
          </ListGroup>
          {this.renderOther()}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    petFormActions: bindActionCreators(Object.assign({}, addMyPetFormActions), dispatch),
    detailActions: bindActionCreators(Object.assign({}, petDetailActions), dispatch),
    rootActions:  bindActionCreators(Object.assign({}, rootActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetFormScene);
