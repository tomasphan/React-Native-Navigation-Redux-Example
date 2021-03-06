import Immutable from 'seamless-immutable';
import { 
  FETCHING_ATTENDEE_DATA,
  FETCHING_ATTENDEE_DATA_SUCCESS,
  FETCHING_ATTENDEE_DATA_FAIL,
} from '../actions/actiontypes';

const initialState = Immutable({
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null,
    refreshing: false,
  });

export default function (state = initialState, action) {
    switch (action.type) {
      case FETCHING_ATTENDEE_DATA:
        return Object.assign({}, state, {
          isFetching: true,
          data: [],
          hasError: false,
          errorMessage: null,
          refreshing: false
        });
  
        case FETCHING_ATTENDEE_DATA_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          data: action.payload,
          hasError: false,
          errorMessage: null,
          refreshing: false,
        });
  
        case FETCHING_ATTENDEE_DATA_FAIL:
        return Object.assign({}, state, {
          isFetching: false,
          data: action.payload,
          hasError: true,
          errorMessage: action.err,
          refreshing: false
        });
  
        default:
          return state;
    }
  }
