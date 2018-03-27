import * as types from './actiontypes';
import axios from 'axios';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { 
  FETCHING_DATA, 
  FETCHING_DATA_SUCCESS, 
  FETCHING_DATA_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from '../actions/actiontypes';
import { AsyncStorage, Alert } from 'react-native';
import configureStore from '../store';

const { persistor } = configureStore();
/*
dispatch the actionCreators 
*/
export function login(username, password) {
  persistor.purge();
  return async function (dispatch, getState) {
    dispatch(itemsIsLoading(true));
    axios({
      method: 'post',
      url: 'https://dolby.okta.com/api/v1/authn',
      data: {
        username: username,
        password: password
      },
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
    .then(response => {
       const userNameOkta = (response.data._embedded.user.profile)
      console.log(userNameOkta);
      // this.setState({
      //   userNameOkta: (response.data._embedded.user.profile.login)
      // });
      dispatch(myInfo(userNameOkta));
      dispatch(changeAppRoot('Landing'))
      //Toast.show('Logged in as ' + userName, Toast.SHORT)
      //dispatch(itemsIsLoading(false));
  }).catch(error => {
      //dispatch(setLoginError(true))
      //dispatch(setLoginSuccess(false));
      //dispatch(itemsIsLoading(false));
      //console.log(error); 
      dispatch(itemsIsLoading(false));
      Alert.alert(
        'Login Error',
        'Incorrect Username or Password'
       );
      //Toast.show('ERROR', Toast.SHORT)
      });
    }
}

/*
Action Creators
*/

export function changeAppRoot(root) {
  return {
    type: types.ROOT_CHANGED, 
    root: root,
  };
}

export function myInfo(myUser) {
  return {
    type: types.MY_INFO,
    myUser: myUser
  };
}

export function swipe(swipeDirections) {
  return {
    type: types.SWIPE_RIGHT, 
    gestureName: swipeDirections
  };
}

export function itemsIsLoading(bool) {
  return {
      type: 'LOGIN_REQUEST',
      isLoginPending: bool
  };
}

export function appInitialized() {
  return async function(dispatch, getState) {
    //dispatch(itemsIsLoading(true));
    //dispatch(setLoginSuccess(false));
    //dispatch(persistLogin(false));
    //dispatch(itemsIsLoading(false));
    dispatch(changeAppRoot('login'));
  };
}

export function appInitialized_Landing() {
  return async function(dispatch, getState) {
    //dispatch(itemsIsLoading(true));
    //dispatch(setLoginSuccess(false));
    //dispatch(persistLogin(false));
    //dispatch(itemsIsLoading(false));
    dispatch(changeAppRoot('Landing'));
  };
}

export function appInitialized_login() {
  return async function(dispatch, getState) {
    //dispatch(itemsIsLoading(true));
    //dispatch(setLoginSuccess(true));
    //dispatch(persistLogin(true));
    //dispatch(itemsIsLoading(false));
    dispatch(changeAppRoot('after-login'));
  };
}

export function setLoginError(bool) {
  return {
    type: LOGIN_ERROR,
    //loginError
    isLoginError: bool
  };
}

export function setLoginSuccess(bool) {
  return {
    type: LOGIN_SUCCESS,
    isLoginSuccess: bool,
    persistLogin: true
  }
}

export function logOut(onSignOut) {
  return {
    type: LOGOUT,
    onSignOut: true
  }
}
