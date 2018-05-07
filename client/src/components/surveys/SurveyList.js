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
        <div className="card mb-3" key={survey._id}>
          <div className="card-body">
            <h5 className="card-title">{survey.title.toUpperCase()}</h5>
            <div className="card-text">
              <p>{survey.body}</p>
              <p className="date float-right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
              <span className="mr-3">Yes: {survey.yes}</span>
              <span>No: {survey.no}</span>
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
