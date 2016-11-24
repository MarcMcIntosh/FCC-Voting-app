'use strict';

import {
  REQUEST_USER_ACCOUNT,
  RECEIVE_USER_ACCOUNT,
  ERROR_USER_ACCOUNT,
} from '../actions/GetUserAccount';

import {
  REQUEST_CREATE_ACCOUNT,
  ERROR_CREATING_ACCOUNT,
  RECEIVE_CREATED_ACCOUNT,
} from '../actions/CreateUserAccount';

export default function (state, action) {
  console.log(action.payload);
  switch (action.type) {
    case ERROR_USER_ACCOUNT: return {
      ...state,
      ...action.isFetching,
      error: action.payload,
    };
    case REQUEST_USER_ACCOUNT: return {
      ...state,
      ...action.isFetching,
      error: null,
      user: null,
    };
    case RECEIVE_USER_ACCOUNT: return {
      ...state,
      ...action.isFetching,
      user: action.payload,
    };
    case REQUEST_CREATE_ACCOUNT: return {
      ...state,
      error: null,
      user: null,
      authenticated: false,
    };
    case ERROR_CREATING_ACCOUNT: return {
      ...state,
      ...action.isFetching,
      authenticated: false,
      error: action.payload,
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
