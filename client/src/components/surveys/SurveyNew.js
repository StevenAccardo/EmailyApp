//Where the User creates a new surveys
//Parent element to SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  //How to initialize state without CreateReactApp
  // constructor(props) {
  //   super(props);
  //
  //   this.state = { showFormReview: false  }
  // }

  //Only able to initialize state like this because of a babel plugin in the the CreateReactApp provides
  state = { showFormReview: false };

  //determines which React element should be rendered
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    //call back passed into props that will change the state on the SurveyNew component.
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

//using reduxForm as a trick to clear the values whenever the user clicks cancel and then comes back
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
