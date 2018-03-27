//import { Platform, AsyncStorage, onCompletion } from 'react-native';
import promise from 'redux-promise';
import thunk from "redux-thunk";
//import reduxReset from 'redux-reset';
import devToolsEnhancer from 'remote-redux-devtools';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createLogger } from 'redux-logger';
//import reducers from "./reducers/index";
import * as reducers from './reducers/index';

export default function configureStore() {
    const config = {
    key: 'test2',
    storage,
    blacklist: ['login']
};
    const logger = createLogger();
    //const reducer = combineReducers(reducers);
    const reducer = persistCombineReducers(config, reducers);
    const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
    const store = createStoreWithMiddleware(
        reducer,
        //initialState,
        devToolsEnhancer({
            name: 'NativeStarterKit', 
            realtime: true, 
            hostname: 'localhost', 
            port: 5678
        }),  
    );
   
    const persistor = persistStore(store);
  
    return { store, persistor };
  }
