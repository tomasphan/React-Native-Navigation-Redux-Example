import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator
} from 'react-native';
//import {Navigation} from 'react-native-navigation';
import { connect } from 'react-redux';
//import * as appActions from '../../actions/index';
import Header from '../Header';
import Button from '../Button';
import * as userActions from '../../actions';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        //isLoginPending: false
    };
}

userLogin(e) {
  this.props.onLogin(this.state.username, this.state.password);

  e.preventDefault();
  //e.username.reset();
}
renderButton() {
    return (
      <Button onPress={(e) => this.userLogin(e)}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>
    );
  }

renderLoader() {
     if (this.props.isLoginPending) {
      return (
        <ActivityIndicator size="large" color='#008996' />
      ); 
    }
}

  render() {
    console.log(this.props.isLoginPending);
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Header headerText={'Login'} />
      {this.renderLoader()}
      <TextInput
      autoCapitalize='none' 
      autoCorrect={false} 
      autoFocus={true} 
      keyboardType='email-address' 
      placeholder="Username"
      style={[styles.textInput, { marginTop: 40 }]}
      value={this.state.username}
      onChangeText={username => this.setState({ username })} 
      />
    <TextInput
      autoCapitalize='none' 
      autoCorrect={false} 
      autoFocus={false} 
      keyboardType='email-address' 
      secureTextEntry placeholder="Password" 
      style={[styles.textInput, { marginVertical: 20 }]}
      value={this.state.password}
      onChangeText={password => this.setState({ password })}
    />
    {this.renderButton()}
    <TouchableOpacity 
    style={{
      alignSelf: 'flex-end',
      height: 40,
      justifyContent: 'center',
      marginBottom: 20
   }} 
  />
  <Text style={{ alignSelf: 'center', color: '#A6A8A9', fontSize: 15 }}>
    Having Issues? <Text style={{ color: 'rgb(0, 131, 255)', fontSize: 14 }}>SUPPORT</Text>
  </Text>
  <TouchableOpacity
    style={{
      alignSelf: 'center',
      height: 34,
      justifyContent: 'center'
    }}
  >
    <Text style={{ color: 'gray', fontSize: 12 }}>
      For Dolby Laboratories, Inc Internal user only
    </Text>
  </TouchableOpacity>
    </View>
    </SafeAreaView>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18,
    //backgroundColor: 'black'
  },
  text: {
    textAlign: 'center'
  },
  mainContent: {
    margin: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
};

const mapStateToProps = (state) => {
  return {
      //isLoggedIn: state.isLoggedIn,
      isLoginPending: state.itemsIsLoading,
      //isLoginSuccess: state.isLoginSuccess,
      //loginError: state.loginError,
      //isSignedIn: state.persistLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      
      onLogin: (username, password) => { 
        
        dispatch(userActions.login(username, password)); 
      },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
