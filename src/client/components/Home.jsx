import React from 'react';
import { connect } from 'react-redux';
import getPolls from '../actions/Polls';

const Home = () => (
  <h1>Home page</h1>
);

Home.propTypes = {
  polls: React.PropTypes.array,
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
    React.PropTypes.instanceOf(Error),
    React.PropTypes.bool,
  ]),
  fetching: React.PropTypes.bool,
  onGetPolls: React.PropTypes.func,
};

const mapStateToProps = state => ({
  polls: state.polls,
  fetching: state.isFectching,
  error: state.error,
  success: state.success,
});

const mapDispatchToProps = dispatch => ({
  onGetPolls: () => dispatch(getPolls()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
