'use strict';

import fetch from 'isomorphic-fetch';

export const ERROR_CREATING_ACCOUNT = 'ERROR_CREATING_ACCOUNT';
export function error(payload) {
  return {
    type: ERROR_CREATING_ACCOUNT,
    isFetching: false,
    payload,
  };
}

export const RECEIVE_CREATED_ACCOUNT = 'RECEIVE_CREATED_ACCOUNT';
export function receive(payload) {
  return {
    type: RECEIVE_CREATED_ACCOUNT,
    isFetching: false,
    payload,
  };
}

export const REQUEST_CREATE_ACCOUNT = 'REQUEST_CREATE_ACCOUNT';
export default function (account) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_CREATE_ACCOUNT,
      isFetching: true,
    });
    return fetch('/api/signup', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: account,
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response creating account');
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return dispatch(error(json.payload));
      } return dispatch(receive(json.payload));
    }).catch(err => dispatch(error({ message: err })));
  };
}
