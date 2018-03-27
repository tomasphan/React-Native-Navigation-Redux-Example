import {
    root,
    swipe,
    itemsIsLoading,
    myInfo
    //setLoginError,
    //setLoginSuccess,
    //logout

} from './rootReducer';
import sessionReducer from './sessionReducer';
import attendeeReducer from './attendeeReducer';
import searchReducer from './searchReducer';

/*
This file exports the reducers as an object which 
will be passed onto combineReducers method at src/app.js
*/

export {
    root,
    itemsIsLoading,
    //setLoginError,
    //setLoginSuccess,
    sessionReducer,
    attendeeReducer,
    searchReducer,
    swipe,
    myInfo
    //logout

};

