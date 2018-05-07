//THE COMPONENT THAT IS DISPLATED WHENEVER THE USER IS LOGGED IN, IT SHOWS THEM THEIR CAMPAIGNS, AND ALLOWS THEM TO CREATE A NEW ONE

import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        {/* Uses the materialize library to create a button with an icon in it. */}
        <Link to="/surveys/new">
          <button className="survey-add btn btn-lg btn-primary my-3 float-right rounded-circle">
            <i className="material-icons">add</i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
