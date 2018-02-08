//SHOWS USERS THEIR FORM INPUTS FOR review
//CALLED BY THE SURVEYNEW FILE

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  //maps through the formFields array and returns jsx. Pulls the formfield.label off to print as a label, and then uses the formfield.name as the key to the formValues to get the use inputed value for that corresponding label.
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries.</h5>
      {reviewFields}
      <button
        className="yellow white-text darken-2 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        //submitSurvey is the action creator in index.js
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat white-text right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

//reaches into the application state and pulls out the values that the redux-form had stored in there.
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
