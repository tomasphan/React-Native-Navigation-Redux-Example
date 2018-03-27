import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import Modal from 'react-native-modal'; // 5.3.0
import { Rating } from 'react-native-elements'; // 0.19.0

export default class Ratings extends Component {
    constructor(props) {
        super(props);
         this.state = this.getInitialState();
         //console.log(this.state.dataSource);
      }

  getInitialState() {
    return {
        visibleModal: null
    };
}

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Rating
        showRating
        type="custom"
        fractions={1}
        startingValue={4.6}
        imageSize={40}
        ratingColor='#008996'
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
    <TextInput 
        style={styles.input}
        multiline={true}
        placeholder='Tell us more...'
        underlineColorAndroid={'transparent'}
        textAlignVertical={'top'}
    />
      {this.renderButton('Submit', () => this.setState({ visibleModal: null }))}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderButton('Ratings', () =>
          this.setState({ visibleModal: 1 })
        )}
        <Modal isVisible={this.state.visibleModal === 1}>
          {this.renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  star: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
  input: {
      height: 200,
      width: '100%',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',

    },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
};
