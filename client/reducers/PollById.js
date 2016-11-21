'use strict';

import {
  RECEIVE_POLL_BY_ID,
  REQUEST_POLL_BY_ID,
  ERROR_POLL_BY_ID,
} from '../actions/GetPollById';

export default function (state, action) {
  switch (action.type) {
    case REQUEST_POLL_BY_ID: return {
      ...state,
      isFetching: true,
      error: null,
      view: null,
    };
    case ERROR_POLL_BY_ID: return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
    case RECEIVE_POLL_BY_ID: return {
      ...state,
      error: false,
      isFetching: false,
      view: action.payload,
    };
    default: return state;
  }
}
