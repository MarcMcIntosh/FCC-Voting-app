import React from 'react';
import { connect } from 'react-redux';
import { get } from '../../actions/ViewPoll';
import Stats from './Stats';

class Container extends React.Component {
  componentDidMount() {
    if (!this.props.data || this.props.params.uuid !== this.props.data.id) {
      this.props.onGetPollById(this.props.params.uuid);
    }
  }
  render() {
    if (this.props.loading) {
      return (<div className="loading" />);
    } else if (this.props.data) {
      return (<Stats
        question={this.props.data.question}
        answers={this.props.data.answers}
      />);
    }
    return (<div />);
  }
}

Container.propTypes = {
  params: React.PropTypes.shape({
    uuid: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  }),
  data: React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    question: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    answers: React.PropTypes.array,
  }),
  onGetPollById: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  data: state.view,
  loading: state.isFetching,
});

const mapDispatchToProps = dispatch => ({
  onGetPollById: id => dispatch(get(id)),
});
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
export default connect(mapStateToProps, mapDispatchToProps)(Container);
