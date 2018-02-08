//Component for reduxForm that user fills out to create new survey.

//importing so we can use the _.map function to iterate over the array and create a new array after manipulation
import _ from 'lodash';
import React, { Component } from 'react';
//reduxForm helper that allows our form to communicate with our redux store.
//reduxForm helper is nearly identical to the connect helper as far as its functionality.
//The Field component is a redux-form helper for rendering any type of html form element.
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
//imports the field labels and names for the redux form
import formFields from './formFields';

class SurveyForm extends Component {
  //helper function to keep the
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      //In order for the Field component to render properly we have to pass is certian manditory properties to tell it how to behave.
      //We can add anytype of custom props to be passed on to children i.e. the label prop below
      return (
        <Field
          key={name}
          label={label}
          type="text"
          //name property can be anything, when user types or makes action on Field element, redux-form is going to store that value inside of the redux store under a key of the name given below, so in this case "surveyTitle"
          name={name}
          // component="input" You would use this if you wanted to render a standard html form element
          //Use this method when you want to create a custom form element
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form
          //The handleSubmit method is provided by the redux-form library as a prop on the form element.
          //Whatever function we patt to the handleSubmit method will be called whenever the user tries to submit the form.
          //We pass the handleSubmit function another function which will change the state on the SurveyNew component. We are not immediately incoking the onSurveySubmit function because if so, it would be ran as soon as the interperter read it, instead, we want it to be exceuted when the user clicks submit.
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {/* In order for the Field component to render properly we have to pass is certian manditory properties to tell it how to behave. */}
          {/* <Field
            type="text"
            //name property can be anything, when user types or makes action on Field element, redux-form is going to store that value inside of the redux store under a key of the name given below, so in this case "surveyTitle"
            name="surveyTitle"
            component="input"
          /> */}
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

//validate only takes one arg, an object that contains all of the values that are coming off of our form.
function validate(values) {
  const errors = {};

  //Calls the custom function that we are importing from the /utils/validateEmails.js file and passes it the string of emails the user has entered in. Whatever is returned from that fucntion is then assigned to the errors.emails property. The validate fucntion runs once whne the component renders, and so ther will be no emails string yet, so we pass it an empty string to handle that issue.
  errors.recipients = validateEmails(values.recipients || '');

  //Uses lodash .each() method to itereate over each field, pull the value of the name property off, and then use that as the key on the values object to see if there is a value. If there is not, then it adds an error message to the errors object under that label name.
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  //if this function returns the errors constant as an empty object, then redux-form assumes the validation was good, and allows the form to be submitted.
  return errors;
}

//reduxForm only takes one arg, which is an object of options
export default reduxForm({
  //if a function is passed in as the value to the validate key, it will be ran everytime the user submits the form.
  validate, // === validate: validate
  //form is the only property that must be on the object that is passed into reduxForm
  form: 'surveyForm',
  //determines if the form input values are cleared out, or not. Set to true by default.
  destroyOnUnmount: false
})(SurveyForm);
