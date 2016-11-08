import { getPollById } from '../api/Polls';

export const RECEIVE_POLL_BY_ID = 'RECEIVE_POLL_BY_ID';
export function receive(payload) {
  return {
    type: RECEIVE_POLL_BY_ID,
    payload,
  };
}
export const POLL_BY_ID_ERROR = 'POLL_BY_ID_ERROR';
export function error(payload) {
  return {
    type: POLL_BY_ID_ERROR,
    payload,
  };
}

export const GET_POLL_BY_ID = 'GET_POLL_BY_ID';
export function get(id) {
  if (!id) {
    return dispatch => dispatch(error(new Error('A Poll Id must be provided')));
  }
  return (dispatch) => {
    dispatch({ type: GET_POLL_BY_ID });
    return getPollById(id, (err, payload) => {
      if (err) {
        return dispatch(error(err));
      }
      return dispatch(receive(payload));
    });
  };
}
