'use strict';

import fetch from 'isomorphic-fetch';

export const RECEIVE_USER_ACCOUNT = 'RECEIVE_USER_ACCOUNT';
export function receive(payload) {
  return {
    type: RECEIVE_USER_ACCOUNT,
    isFetching: false,
    payload,
  };
}

export const ERROR_USER_ACCOUNT = 'ERROR_USER_ACCOUNT';
export function error(payload) {
  return {
    type: ERROR_USER_ACCOUNT,
    isFetching: false,
    payload,
  };
}

export const REQUEST_USER_ACCOUNT = 'REQUEST_USER_ACCOUNT';
export default function () {
  return (dispatch) => {
    dispatch({ type: REQUEST_USER_ACCOUNT, isFetching: true });
    return fetch('/api/account', {
      credentials: 'same-origin',
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response requesting user account');
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return dispatch(error(json.payload));
      } return dispatch(receive(json.payload));
    }).catch(err => dispatch(error({ message: err })));
  };
}
