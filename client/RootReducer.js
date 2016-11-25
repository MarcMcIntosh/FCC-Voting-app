import reduceReducers from 'reduce-reducers';
import polls from './reducers/Polls';
import view from './reducers/ViewPoll';
import UserAccount from './reducers/UserAccount';
import SignIn from './reducers/SignIn';

export default reduceReducers(
  polls,
  view,
  UserAccount,
  SignIn,
);
