'use strict';

import fetch from 'isomorphic-fetch';

export const RECEIVE_POLL_BY_ID = 'RECEIVE_POLL_BY_ID';
export function receive(payload) {
  return {
    type: RECEIVE_POLL_BY_ID,
    isFetching: false,
    payload,
  };
}

export const ERROR_POLL_BY_ID = 'ERROR_POLL_BY_ID';
export function error(payload) {
  return {
    type: ERROR_POLL_BY_ID,
    isFetching: false,
    payload,
  };
}


export const REQUEST_POLL_BY_ID = 'REQUEST_POLL_BY_ID';
export default function (id) {
  return (dispatch) => {
    dispatch({ type: REQUEST_POLL_BY_ID, isFetching: true });
    return fetch(`/api/poll/${id}`).then((res) => {
      if (res.status >= 400) {
        throw new Error(`Error REQUEST_POLL_BY_ID: ${id}`);
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return dispatch(error(json.payload));
      } return dispatch(receive(json.payload));
    }).catch((err) => {
      dispatch(error({ message: err }));
    });
  };
}
