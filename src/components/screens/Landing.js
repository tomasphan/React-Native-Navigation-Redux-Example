import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  ImageBackground,
  Image,
  SafeAreaView
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {Navigation} from 'react-native-navigation';
import { purgeStoredState } from 'redux-persist';
import { connect } from 'react-redux';
import * as appActions from '../../actions/index';
import configureStore from '../../store';

export class Landing extends Component {
  onSwipeRight() {
    console.log(this.props.swipe);
  }

  LandingPage(e) {
    //persistor.purge();
    e.preventDefault();
    this.props.goToEvent();
    //e.username.reset();
  }
  //onPress={() => onSignOut().then(() => navigation.navigate('SignedOut'))}
  render() {
    return (
      // <ImageBackground 
      // source={require('../../img/splash_legal.png')} 
      // style={styles.backgroundImage} 
      // resizeMode={Image.resizeMode.sretch}
      // > 
      <View style={styles.container}>     
      <View style={styles.legalSummit}>
      <Text style={styles.LtextStyle}> Legal Summit 2018 </Text>
      </View>
      <CountDown
      until={2000000}
      digitBgColor={'#007E8B'}
      digitTxtColor={'#FFFFFF'}
      //onFinish={() => alert('finished')}
      //onPress={() => alert('hello')}
      size={30}
      /> 
        <TouchableHighlight
        style={styles.button}
        onPress={(e) => this.LandingPage(e)}
        >
        <Text style={styles.textStyle}> Show Schedule </Text>
       </TouchableHighlight>
      </View>
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
overlay: {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'red',
  opacity: 0.3
},
  legalSummit: {
    marginTop: 20,
    marginBottom: 200
  },
  safeArea: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    color: '#000',
    fontSize: 26,
    fontWeight: '600',
},
  LtextStyle: {
    color: '#909090',
    fontSize: 36,
    fontWeight: '500',
},
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: 0,
    position: 'relative',
}
});

function mapStateToProps(state) {
  return {
      //isLoggedIn: state.isLoggedIn,
      //isSignedIn: state.persistLogin,
      myUser: state.myInfo,
      isLoginPending: state.itemsIsLoading,
      swipe: state.swipe,
      logout: state.logout
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      goToEvent: () => {
        //console.log(this.props._persist);
        dispatch(appActions.appInitialized_login());
        dispatch(appActions.itemsIsLoading(false));
      },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
