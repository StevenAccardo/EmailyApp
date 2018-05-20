//Called by the dashboard, fetches the list of surveys the user has created and displays them.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    //Fetches the list of surveys that the user has created.
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="surveyCard card mb-3" key={survey._id}>
          <div className="surveyCard__body card-body">
            <h5 className="surveyCard__title card-title">{survey.title.toUpperCase()}</h5>
            <div className="survey__text card-text">
              <p className="survey__text__main">{survey.body}</p>
              <p className="survey__text__date float-right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
              <span className="survey__text__yes mr-3">Yes: {survey.yes}</span>
              <span className="survey__text__no">No: {survey.no}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
