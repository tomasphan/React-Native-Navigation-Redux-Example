import axios from 'axios';
import { apiBaseURLSessions } from '../Utils/constants';
import { 
  FETCHING_SESSION_DATA,
  FETCHING_SESSION_DATA_SUCCESS,
  FETCHING_SESSION_DATA_FAIL
} from '../actions/actiontypes';

export default function FetchSessionData() {
    return dispatch => {
      dispatch({ type: FETCHING_SESSION_DATA });
  
      return axios.get(`${apiBaseURLSessions}`)
        .then(res => {
          dispatch({ type: FETCHING_SESSION_DATA_SUCCESS, payload: res.data.results });
        })
        .catch(err => {
          dispatch({ type: FETCHING_SESSION_DATA_FAIL, payload: err.data.results });
        });
    };
  }
