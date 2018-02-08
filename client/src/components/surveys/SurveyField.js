// SURVEYFIELD CONTAINS LOGIC TO RENDER A SINGLE LABEL AND TEXT INPUT

import React from 'react';

//inherets props from the Field component in SurveyForms
//nested es6 destructuring to get the error and touched properties
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      {/* using spread operator to gain access to all properties on input object without having to individiually pass them as props */}
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {/* pulls the validation error message off of the meta object and displays it below the input, if no error, then meta.error will have a value of undefined and nothing will be displayed. */}
        {touched && error}
      </div>
    </div>
  );
};
