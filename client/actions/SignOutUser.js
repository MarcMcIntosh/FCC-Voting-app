'use strict';

import fetch from 'isomorphic-fetch';

export const ERROR_USER_SIGNOUT = 'ERROR_USER_SIGNOUT';
export function error(payload) {
  return {
    type: ERROR_USER_SIGNOUT,
    isFetching: false,
    payload,
  };
}

export const RECEIVE_USER_SIGNOUT = 'RECEIVE_USER_SIGNOUT';
export function receive(payload) {
  return {
    type: RECEIVE_USER_SIGNOUT,
    isFetching: false,
    payload,
  };
}

export const REQUEST_USER_SIGNOUT = 'REQUEST_USER_SIGNOUT';
export default function () {
  return (dispatch) => {
    dispatch({
      type: REQUEST_USER_SIGNOUT,
      isFetching: true,
    });
    return fetch('/api/signout', {
      credentials: 'same-origin',
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response getting polls');
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return dispatch(error(json.payload));
      } return dispatch(receive(json.payload));
    }).catch(err => dispatch(error({ message: err })));
  };
}
