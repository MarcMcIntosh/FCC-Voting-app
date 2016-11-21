'use strict';

import fetch from 'isomorphic-fetch';

export const ERROR_USER_SIGNIN = 'ERROR_USER_SIGNIN';
export function error(payload) {
  return {
    type: ERROR_USER_SIGNIN,
    isFetching: false,
    payload,
  };
}

export const RECEIVE_USER_SIGNIN = 'RECEIVE_USER_SIGNIN';
export function receive(payload) {
  return {
    type: RECEIVE_USER_SIGNIN,
    isFetching: false,
    payload,
  };
}

export const REQUEST_USER_SIGNIN = 'REQUEST_USER_SIGNIN';
export default function (account) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_USER_SIGNIN,
      isFetching: true,
    });
    return fetch('/api/signin', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: account,
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response signing in user');
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return dispatch(error(json.payload));
      } return dispatch(receive(json.payload));
    }).catch(err => dispatch(error({ message: err })));
  };
}
