import {
  RECEIVE_POLL_LIST,
  POLL_LIST_ERROR,
  GET_POLL_LIST,
} from '../actions/Polls';

export default function (state, action) {
  switch (action.type) {
    case RECEIVE_POLL_LIST: return {
      ...state,
      polls: action.payload,
      isFetching: false,
      success: true,
      error: false,
    };
    case POLL_LIST_ERROR: return {
      ...state,
      error: action.payload,
      isFetching: false,
      success: false,
    };
    case GET_POLL_LIST: return {
      ...state,
      isFetching: true,
    };
    default: return state;
  }
}
