import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types.js';

//This is a different way of working with action creators using the reduxThunk library. instead of returning an action, if reduxThunk sees us return a function, it will immediately execute that function and pass it the dispatch variable as an argument.
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  //we only care about res.data, so no need to pass back the entire response object
  dispatch({ type: FETCH_USER, payload: res.data });
};

//Posts the stripe token and transaction info to the server
//Server returns the updated user data with the updated currency amount that the user has.
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  //sends user to the designated route
  //history object made available by SURVEYNEW file, passed as prop.
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
