import {
  RECEIVE_POLL_BY_ID,
  GET_POLL_BY_ID,
  ERROR_POLL_BY_ID,
} from '../actions/ViewPoll';

export default function (state, action) {
  switch (action.type) {
    case ERROR_POLL_BY_ID: return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
    case GET_POLL_BY_ID: return {
      ...state,
      isFetching: true,
    };
    case RECEIVE_POLL_BY_ID: return {
      ...state,
      error: false,
      isFetching: false,
      view: action.payload,
    };
    default: return state;
  }
}
