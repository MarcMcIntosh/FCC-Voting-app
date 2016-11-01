import reduceReducers from 'reduce-reducers';
import polls from './reducers/Polls';

const DEFAULT_STATE = {
  polls: [],
  isFetching: false,
  error: undefined,
  success: undefined,
};

export default reduceReducers(
  (state = DEFAULT_STATE) => state,
  polls,
);
