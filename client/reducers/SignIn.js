'use strict';

import {
  ERROR_USER_SIGNIN,
  RECEIVE_USER_SIGNIN,
  REQUEST_USER_SIGNIN,
} from '../actions/SignInUser';

export default function (state, action) {
  switch (action.type) {
    case REQUEST_USER_SIGNIN: return {
      ...state,
      ...action.isFetching,
    };
    case ERROR_USER_SIGNIN: return {
      ...state,
      ...action.isFetching,
      error: action.payload,
      authenticated: false,
    };
    case RECEIVE_USER_SIGNIN: return {
      ...state,
      ...action.isFetching,
      error: null,
      user: action.payload,
      authenticated: true,
    };
    default: return state;
  }
}
