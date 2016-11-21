'use strict';

import {
  ERROR_USER_SIGNOUT,
  RECEIVE_USER_SIGNOUT,
  REQUEST_USER_SIGNOUT,
} from '../actions/SignOutUser';

export default function (state, action) {
  switch (action.type) {
    case ERROR_USER_SIGNOUT: return {
      ...state,
      ...action.isFetching,
      error: action.payload,
    };
    case RECEIVE_USER_SIGNOUT: return {
      ...state,
      ...action.isFetching,
      authenticated: false,
      user: action.payload,
    };
    case REQUEST_USER_SIGNOUT: return {
      ...state,
      ...action.payload,
    };
    default: return state;
  }
}
