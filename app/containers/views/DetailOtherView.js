import React from 'react'
import {Navigator, StyleSheet, View, ScrollView, Alert} from 'react-native'
import MarkingNavbar from '../../components/common/MarkingNavbar'
import ListGroup from '../../components/elements/ListGroup'
import List from '../../components/elements/List'
import Colors from '../../themes/Colors'

export default class DetailOtherView extends React.PureComponent {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    pet: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  /**
   * 編集リンク押下時のアクション
   */
  handlePressEditLink() {
    // 元の画面に戻る処理を定義する
    const callback = (pet) => {
      pet = !!pet ? pet : this.props.pet; // 万が一ペット情報が渡ってこないようであれば、今表示中のペットを使う
      this.props.navigator.replace({name:'DetailScene', props:{pet, initial:'others'}});
    };
    // ペットの編集画面に遷移する
    this.props.navigator.replace({name:'PetFormScene', props:{pet:this.props.pet, back:callback}});
  }

  /**
   * アーカイブのリンク押下時のアクション
   */
  handlePressArchiveLink() {
    Alert.alert('アーカイブしますか？', '思い出になったペットをアーカイブします。アーカイブすると新しくマーキング記録できなくなります。', [
      {text: 'いいえ', style: 'cancel'},
      {text: 'はい', onPress: () => this.props.actions.archivePet(this.props.pet)},
    ]);
  }

  /**
   * 画面をレンダリングする
   */
  render() {
    const left = {icon:'arrow-back', handler:() => this.props.navigator.pop()};
    const archive = this.props.pet.dead === '1' ? null : (
      <ListGroup title="アーカイブ">
        <List icon="account-balance" iconColor={Colors.red} title="アーカイブ（思い出）する" chevron={true} border={false} onPress={this.handlePressArchiveLink.bind(this)}/>
      </ListGroup>
    );
    return (
      <View style={{flex:1, backgroundColor:Colors.backgroundColor}}>
        <MarkingNavbar title="その他" left={left}/>
        <ScrollView style={{flex:1}}>
          <ListGroup title="基本操作">
            <List icon="pets" iconColor={Colors.gray} title={this.props.pet.name + 'の編集'} chevron={true} border={false} onPress={this.handlePressEditLink.bind(this)}/>
          </ListGroup>
          {archive}
        </ScrollView>
      </View>
    );
  }
}
