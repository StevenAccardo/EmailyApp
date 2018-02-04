//Reducer for whether the user is actually logged in, or not.

import { FETCH_USER } from '../actions/types';

//state default null because we don't know initially if the user is logged in or not
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      //if user is not logged in, then the action.payload will be an empty string, which is a falsey value.
      return action.payload || false;
    default:
      return state;
  }
}
