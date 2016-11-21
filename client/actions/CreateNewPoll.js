'use strict';

import fetch from 'isomorphic-fetch';

export const ERROR_CREATEING_NEW_POLL = 'ERROR_CREATEING_POLL';
export function error(payload) {
  return {
    type: ERROR_CREATEING_NEW_POLL,
    isFetching: false,
    payload,
  };
}

export const RECEIVE_NEW_POLL = 'RECEIVE_NEW_POLL';
export function receive(payload) {
  return {
    type: RECEIVE_NEW_POLL,
    isFetching: false,
    payload,
  };
}

export const REQUEST_CREATE_NEW_POLL = 'REQUEST_CREATE_NEW_POLL';
export default function (payload) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_CREATE_NEW_POLL,
      isFetching: true,
    });
    return fetch('/api/new', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    }).then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response creating new poll');
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return dispatch(error(json.payload));
      } return dispatch(receive(json.payload));
    }).catch(err => dispatch(error({ message: err })));
  };
}
