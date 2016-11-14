'use strict';

import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
export function receiveUserData(user) {
  return {
    type: RECEIVE_USER_DATA,
    isFetching: false,
    user,
  };
}

export const RECEIVE_USER_ERROR = 'RECEIVE_USER_ERROR';
export function receiveUserError(error) {
  return {
    type: RECEIVE_USER_ERROR,
    isFetching: false,
    error,
  };
}


export const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
export function requestUserData() {
  return {
    type: REQUEST_USER_DATA,
    isFetching: true,
  };
}

export function reuseUserCookie() {
  return (dispatch) => {
    dispatch(requestUserData());
    return fetch('/api/account').then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    })
    .then((json) => {
      if (!json.success) return receiveUserError(json);
      return receiveUserData(json);
    })
    .catch(err => receiveUserError(err));
  };
}

export const ATTEMPT_USER_SIGNIN = 'ATTEMPT_USER_SIGNIN';
export function attemptUserSign(user) {
  return dispatch => {
    dispatch({ type: ATTEMPT_USER_SIGNIN });
    //eturn fetch('/')

  }
}

export const CREATE_NEW_USER = 'CREATE_NEW_USER';
