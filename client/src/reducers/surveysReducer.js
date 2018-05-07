//Makes the array of surveys a user has created available after the action creator resolves the http request that fetches them.
//They are available under the surveys property

import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
