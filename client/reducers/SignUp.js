'use strict';

import {
  REQUEST_CREATE_ACCOUNT,
  RECEIVE_CREATED_ACCOUNT,
  ERROR_CREATING_ACCOUNT,
} from '../actions/CreateUserAccount';

export default function (state, action) {

  switch (action.type) {
    case REQUEST_CREATE_ACCOUNT: return {
      ...state,
      ...action.isFetching,
    };
    case ERROR_CREATING_ACCOUNT: return {
      ...state,
      ...action.isFetching,
      error: action.payload,
      authenticated: false,
    };
    case RECEIVE_CREATED_ACCOUNT: return {
      ...state,
      ...action.isFetching,
      authenticated: true,
      user: action.payload,
    };
    default: return state;
  }
}
