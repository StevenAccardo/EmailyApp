//COLLECTS ALL OF THE REDUCERS AND MAKES THEM AVAILABLE TO OUR APPLICATIONS BY USING THE PROPERTY KEYS

import { combineReducers } from 'redux';
//changes the name that will be used to access the reducer method from redux-form to make it less ambigious,
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  //when using reduxForm, you must us the word "form" as the key for the reducer, the library depends on that for everything to work correctly.
  form: reduxForm,
  surveys: surveysReducer
});
