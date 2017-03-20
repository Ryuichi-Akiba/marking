import React from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet, Navigator} from 'react-native'
import MAIcon from 'react-native-vector-icons/MaterialIcons'
import MarkingNavbar from '../common/MarkingNavbar'
import ValueListView from '../common/ValueListView'

export default class SelectableListViewField extends React.PureComponent {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    icon: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onClick: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {visible: false, data: props.data};
  }

  setModalVisible(visible) {
    this.setState({visible: visible});
    console.log(this.state.visible);
  }
  showModal() {
    console.log('SHOE MODAL');
    this.setModalVisible(true);
  }
  hideModal() {
    this.setModalVisible(false);
  }

  render() {
    const {input, meta, ...inputProps} = this.props;
    const handlePress = (value) => {
      input.onChange(value);
      this.hideModal();
    };
    const cancel = {
      title: 'Cancel',
      handler: this.hideModal.bind(this),
    };
    const text = !!input.value ? (<Text style={{height: 32, fontSize: 16, paddingTop: 8,}}>{input.value}</Text>) : (<Text style={{height: 32, color: '#999999', fontSize: 16, paddingTop: 8,}}>{this.props.placeholder}</Text>);

    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 45, height: 30, paddingLeft: 5}}>
          <MAIcon name={this.props.icon} size={24} color={'#666666'} style={{paddingTop: 5, paddingBottom: 5}}/>
        </View>

        <TouchableHighlight underlayColor={'#ffffff'} style={{flex: 1, position: 'relative', justifyContent: 'center'}} onPress={this.showModal.bind(this)}>
          {text}
        </TouchableHighlight>

        <Modal animationType="slide" transparent={false} visible={this.state.visible}>
          <MarkingNavbar title={this.props.label} right={cancel} />
          <ValueListView data={this.props.data} onClick={handlePress}/>
        </Modal>
      </View>
    );
  }
}