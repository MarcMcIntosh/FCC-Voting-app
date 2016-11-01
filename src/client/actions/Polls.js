import apiCall from '../api/Polls';

export const RECEIVE_POLL_LIST = 'RECEIVE_POLL_LIST';
export function receive(payload) {
  return {
    type: RECEIVE_POLL_LIST,
    payload,
  };
}
export const POLL_LIST_ERROR = 'POLL_LIST_ERROR';
export function error(payload) {
  return {
    type: POLL_LIST_ERROR,
    payload,
  };
}

export const GET_POLL_LIST = 'GET_POLL_LIST';
export function getPollList() {
  return { type: GET_POLL_LIST };
}

export default function () {
  return (dispatch) => {
    dispatch(getPollList());
    return apiCall((err, payload) => {
      if (err) {
        return dispatch(error(err));
      }
      return dispatch(receive(payload));
    });
  };
}
