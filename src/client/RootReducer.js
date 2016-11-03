import reduceReducers from 'reduce-reducers';
import polls from './reducers/Polls';
import view from './reducers/ViewPoll';

export default reduceReducers(
  polls,
  view,
);
