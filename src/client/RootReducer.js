import reduceReducers from 'reduce-reducers';

const DEFAULT_STATE = {
  PollList: [],
};

export default reduceReducers(
  (state = DEFAULT_STATE) => state,
);
