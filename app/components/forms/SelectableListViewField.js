import React from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native'
import ValueListView from '../common/ValueListView'

/**
 * to be wrapped with redux-form Field component
 */
export default class SelectableListViewField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {visible: false, data: props.data};
    console.log(props.data);
  }

  setModalVisible(visible) {
    this.setState({visible: visible});
  }
  viewModal() {
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

    return (
      <View>
        <Text>{this.props.label}</Text>
        <TouchableHighlight onPress={this.viewModal.bind(this)}>
          <Text>選択する</Text>
        </TouchableHighlight>
        <Modal animationType="slide" transparent={false} visible={this.state.visible}>
          <ValueListView data={this.state.data} onClick={handlePress}/>

          <TouchableHighlight onPress={this.hideModal.bind(this)}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}