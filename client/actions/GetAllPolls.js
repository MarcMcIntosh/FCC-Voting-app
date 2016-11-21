'use strict';

import fetch from 'isomorphic-fetch';

export const RECEIVE_ALL_POLLS = 'RECEIVE_ALL_POLLS';
export function receive(payload) {
  return {
    type: RECEIVE_ALL_POLLS,
    isFetching: false,
    payload,
  };
}

export const ERROR_ALL_POLLS = 'ERROR_ALL_POLLS';
export function error(payload) {
  return {
    type: ERROR_ALL_POLLS,
    isFetching: false,
    payload,
  };
}

export const REQUEST_ALL_POLLS = 'REQUEST_ALL_POLLS';
export default function () {
  return (dispatch) => {
    dispatch({
      type: REQUEST_ALL_POLLS,
      isFetching: true,
    });
    return fetch('/api/polls').then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response getting polls');
      } return res.json();
    }).then((res) => {
      if (!res.success) {
        return dispatch(error(res.payload));
      } return dispatch(receive(res.payload));
    }).catch((err) => {
      dispatch(error({
        type: `Error in ${REQUEST_ALL_POLLS}`,
        message: err,
      }));
    });
  };
}
