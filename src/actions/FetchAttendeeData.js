import axios from 'axios';
import { apiBaseURL } from '../Utils/constants';
import { 
  FETCHING_ATTENDEE_DATA,
  FETCHING_ATTENDEE_DATA_SUCCESS,
  FETCHING_ATTENDEE_DATA_FAIL
} from '../actions/actiontypes';

export default function FetchAttendeeData() {
    return dispatch => {
      dispatch({ type: FETCHING_ATTENDEE_DATA });
  
      return axios.get(`${apiBaseURL}`)
        .then(res => {
          dispatch({ type: FETCHING_ATTENDEE_DATA_SUCCESS, payload: res.data.results });
        })
        .catch(err => {
          dispatch({ type: FETCHING_ATTENDEE_DATA_FAIL, payload: err.data.results });
        });
    };
  }
