import Immutable from 'seamless-immutable';
import * as types from '../actions/actiontypes';
//import initialState from '../reducers/initialState';
// import { 
//   LOGIN_REQUEST
  
// } from '../actions/actiontypes';
const initialState = Immutable({
  root: 'login', // 'login' / 'after-login'
  isLoginSuccess: {},
  isLoginPending: false,
  isSignedIn: {},
  isLoginError: {},
  
});

//root reducer
// 
// export function root(state = initialState, action = {}) {
//     switch (action.type) {
//       case types.ROOT_CHANGED:
//         return state.merge({
//           root: action.root
//         });
  
//       default:
//         return state;
//     }
//   }
  export function root(state = initialState, action = {}) {
    switch (action.type) {
      case types.ROOT_CHANGED:
        return {
          root: action.root
        };
  
      default:
        return state;
    }
}

export function myInfo(state = initialState, action = {}) {
  switch (action.type) {
    case types.MY_INFO:
    return {
      myUser: action.myUser
    };
    default:
    return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
      case 'LOGIN_REQUEST':
          return action.isLoginPending;

      default:
          return state;
  }
}

export function swipe(state = 'none', action) {
  switch (action.type) {
    case 'SWIPE_RIGHT':
        return action.swipe;
     
      default:
      return state;
  }
}

export function setLoginError(state = false, action) {
  switch (action.type) {
      case 'LOGIN_ERROR':
          return action.isLoginError;

      default:
          return state;
  }
}

export function setLoginSuccess(state = false, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
          return action.isLoginSuccess;

      default:
          return state;
  }
}

export function logout(state, action) {
  if (action.type === 'LOGOUT') {
    this.state = undefined;
  }

  return root(state, action);
}
