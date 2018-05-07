// SURVEYFIELD CONTAINS LOGIC TO RENDER A SINGLE LABEL AND TEXT INPUT

import React from 'react';

//inherets props from the Field component in SurveyForms
//nested es6 destructuring to get the error and touched properties
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="form-group">
      <label className="form-labels">{label}</label>
      {/* using spread operator to gain access to all properties on input object without having to individiually pass them as props */}
      <input {...input} className="form-control" />
      <div className="text-danger">
        {/* pulls the validation error message off of the meta object and displays it below the input, if no error, then meta.error will have a value of undefined and nothing will be displayed. */}
        {touched && error}
      </div>
    </div>
  );
};
