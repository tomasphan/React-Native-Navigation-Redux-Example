import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Body
} from 'native-base';
import Modal from 'react-native-modal';
import Moment from 'moment';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { Navigation } from 'react-native-navigation';
import { Rating } from 'react-native-elements';
import { RkButton, RkText, RkStyleSheet, RkCard, RkTheme } from 'react-native-ui-kitten';
import { GradientButton } from '../gradientButton';
import formatNumber from '../../Utils/textUtils';
import Ratings from './Rating';
import { iconsMap } from '../../components/app-icons';

const deviceWidth = Dimensions.get('window').width;

export class SessionDetail extends Component {
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

addToCalendar = (title, startDateUTC, utcEnd, location) => {
  const eventConfig = {
    title,
    startDate: startDateUTC,
    endDate: utcEnd,
    location
  };

  AddCalendarEvent.presentEventDialog(eventConfig)
    .then(eventId => {
      //handle success (receives event id) or dismissing the modal (receives false)
      if (eventId) {
        Alert(eventId);
        console.warn(eventId);
      } else {
        console.log('dismissed');
      }
    })
    .catch((error) => {
      // handle error such as when user rejected permissions
      console.log(error);
    });
};

renderRating(title, description) {
  console.log(description);
  console.log(title);
}

renderModalContent = () => (
  <Modal isVisible={this.state.visibleModal === 1}>
  <View style={styles.modalContent}>
  <TouchableOpacity
  style={styles.Xbutton}
  onPress={() => this.setState({ visibleModal: null })}
  ><Text style={styles.XtextStyle}>x</Text>
  </TouchableOpacity>
  <Text style={styles.ratingText}>Give us your feedback</Text>
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
  <TouchableWithoutFeedback
  style={styles.button}
  onPress={() => this.setState({ visibleModal: null })}
  //onPress={() => this.renderRating(description, title)}
  >
  <View style={styles.button}>
  <Text style={styles.textStyle}> Submit </Text>
  </View>
  </TouchableWithoutFeedback>
  </View>
  </Modal>
);

//moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
render() {
  const { title, description, year, location, start, end } = this.props;
  console.log(Moment.utc(start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
  const utcStart = (Moment.utc(start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
  const utcEnd = (Moment.utc(end).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
  //const utcCal = (location);
  //console.log(Moment(start).format('dddd, MMMM Do YYYY, h:mm:ss '));
    return (
   <View style={styles.container}>   
    <Container style={styles.container}>
        <Content padder>
        <Card style={styles.mb}>
        <CardItem bordered>
          <Left>
            <Body>
              <Text style={styles.header}>{description.toUpperCase()}</Text>
              <Text style={styles.subheader}>{location}</Text>
              <Text style={styles.subheader}>{Moment(start).format('dddd, MMMM Do YYYY, h:mm a')}</Text>
            </Body>
          </Left>
        </CardItem>
        {this.renderModalContent()}
        <CardItem>
          <Body>
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2017/03/26/12/13/countryside-2175353_960_720.jpg' }}
              style={{
                alignSelf: 'center',
                height: 150,
                resizeMode: 'cover',
                width: deviceWidth / 1.18,
                marginVertical: 5
              }}
            />
            <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            </Text>
          </Body>
        </CardItem>
        <CardItem style={{ paddingVertical: 0 }}>
          <Left>
          <TouchableOpacity
          style={styles.smallbutton}
          //onPress={() => this.setState({ visibleModal: 1 })}
          onPress={() => {
            this.addToCalendar(title, utcStart, utcEnd, location);
          }}
          title="Add to calendar"
          >
          <Icon name='alarm' />
        </TouchableOpacity>
        <Text style={styles.calsubheader}>{Moment(start).format('dddd, MMMM Do')}</Text>
          </Left>
        </CardItem>
      </Card>
      <TouchableOpacity
      style={styles.button}
      onPress={() => this.setState({ visibleModal: 1 })}
      //onPress={() => this.renderRating(description, title)}
      >
      <Text style={styles.textStyle}> Feedback </Text>
    </TouchableOpacity>
        </Content>
      </Container>
      </View>
    );
  }
}

//YYYY-MM-DDTHH:mm:ss.SSSZ
 const styles = {
    container: {
      flex: 1,
      backgroundColor: '#EEF0F2'
    },
    containerModal: {
      backgroundColor: '#FFFFFF'
    },
    ratingText: {
      fontSize: 24,
      fontWeight: '400'
    },
    mb: {
      marginTop: 15,
      marginBottom: 15,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      padding: 10,
      marginTop: 18,
      alignSelf: 'center',
      width: 140,
      backgroundColor: '#008996',
    },
    smallbutton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 45,
      padding: 10,
      marginTop: 18,
      alignSelf: 'center',
      width: 55,
      backgroundColor: '#EEF0F2',
      borderColor: '#909090',
    },
    Xbutton: {
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#FF8D84',
      borderRadius: 15,
      borderColor: '#000000',
      alignSelf: 'flex-end',
      marginTop: 0,
      position: 'relative',
      width: 40,
      height: 40,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    subheader: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      fontWeight: '300',
    },
    calsubheader: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      fontWeight: '300',
      color: '#0E7EAC',
      marginTop: 10,
      marginLeft: 3,
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
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    userInfo: {
      flexDirection: 'row',
      paddingVertical: 18,
    },
    section: {
      flex: 1,
      alignItems: 'center'
    },
    space: {
      marginBottom: 3
    },
    textStyle: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    smalltextStyle: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
    XtextStyle: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 20,
      fontWeight: '300',
    },
    buttons: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    image: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 50,
    },
    badge: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: -2,
      right: -2
    },
    badgeText: {
      backgroundColor: 'transparent',
      fontSize: 9,
    }
  };

  export default SessionDetail;
