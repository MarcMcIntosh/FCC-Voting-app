'use strict';

import fetch from 'isomorphic-fetch';
import { getPolls } from '../api/Polls';

export const RECEIVE_POLL_LIST = 'RECEIVE_POLL_LIST';
export function receive(payload) {
  return {
    type: RECEIVE_POLL_LIST,
    isFetching: false,
    payload,
  };
}
export const ERROR = 'ERROR';
export function error(payload) {
  return {
    type: ERROR,
    isFetching: false,
    payload,
  };
}

export const REQUEST_POLL_LIST = 'REQUEST_POLL_LIST';
export function requestPollList() {
  return {
    type: REQUEST_POLL_LIST,
    payload: { isFetching: true },
  };
}

export function getPollList() {
  return (dispatch) => {
    dispatch(requestPollList());
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
        type: `Error in ${REQUEST_POLL_LIST}`,
        message: err,
      }));
    });
  };
}
export const GET_POLL_BY_ID = 'GET_POLL_BY_ID';
export function getPollById(id) {
  return (dispatch) => {
    dispatch({
      type: GET_POLL_BY_ID,
      isFetching: true,
    });
    return fetch(`/api/poll/${id}`).then((res) => {
      if (res.status >= 400) {
        throw new Error(
          `Bad response Getting Poll by id: ${id}`
        );
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return dispatch(error(json.payload));
      } return dispatch(receive(json.payload));
    }).catch((err) => {
      dispatch(error({
        type: GET_POLL_BY_ID,
        message: err,
      }));
    });
  };
}

export default function () {
  return (dispatch) => {
    dispatch(requestPollList());
    return getPolls((err, payload) => {
      if (err) {
        return dispatch(error(err));
      }
      return dispatch(receive(payload));
    });
  };
}
