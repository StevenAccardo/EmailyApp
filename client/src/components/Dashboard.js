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
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
