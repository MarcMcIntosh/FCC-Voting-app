import React from 'react';
import { connect } from 'react-redux';

const Container = () => (
  <div className="poll">Some Poll Data</div>
);
/*
* Use object Shape instead
Container.propTypes = {
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  votes: React.PropTypes.array.isRequired,
  auth: React.PropTypes.bool.isRequired,
};

Container.defaultProps = {
  auth: false,
};
*/
export default connect()(Container);
