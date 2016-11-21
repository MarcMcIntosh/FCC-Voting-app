'use strict';

import {
  REQUEST_CREATE_NEW_POLL,
  ERROR_CREATEING_POLL,
  RECEIVE_NEW_POLL,
} from '../actions/CreateNewPoll';

export default function (state, action) {
  switch (action.type) {
    case REQUEST_CREATE_NEW_POLL: return {
      ...state,
      ...action.isFetching,
      error: null,
      view: null,
    };
    case ERROR_CREATEING_POLL: return {
      ...state,
      ...action.isFetching,
      error: action.payload,
    };
    case RECEIVE_NEW_POLL: return {
      ...state,
      ...action.isFetching,
      view: action.payload,
    };
    default: return state;
  }
}
