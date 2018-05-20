//THE COMPONENT THAT IS DISPLATED WHENEVER THE USER IS LOGGED IN, IT SHOWS THEM THEIR CAMPAIGNS, AND ALLOWS THEM TO CREATE A NEW ONE

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SurveyList from './surveys/SurveyList';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonDisable: false,
      message: null
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (nextProps.auth.credits <= 0) {
        this.setState({ buttonDisable: true, message: 'Please purchase more credits.' });
      } else {
        this.setState({ buttonDisable: false, message: null });
      }
    }
  }

  onClick() {
    this.props.history.push('/surveys/new');
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <SurveyList />
        <div className="fixed-action-btn float-right">
          <div className="noCreditsMessage">{this.state.message}</div>
          {/* Uses the materialize library to create a button with an icon in it. */}
          <button disabled={this.state.buttonDisable} onClick={this.onClick} className="survey-add btn btn-lg btn-primary my-3 float-right rounded-circle">
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Dashboard);
