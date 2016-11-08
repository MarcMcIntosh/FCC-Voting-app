import React from 'react';
import { connect } from 'react-redux';
import getPolls from '../../actions/Polls';
// import ListItem from './ListItem';
import PollList from './PollList';

class Home extends React.Component {
  componentDidMount() {
    if (this.props.polls.length <= 0 && !this.props.success && !this.props.error) {
      this.props.onGetPolls();
    }
  }
  render() {
    let dsp = (<div />);
    if (this.props.success) {
      dsp = (<PollList data={this.props.polls} />);
    } else if (this.props.fetching) {
      dsp = (<div className="loading">Loading</div>);
    } else if (this.props.error) {
      dsp = (
        <div>Error: {JSON.stringify(this.props.error)}</div>
      );
    }
    return (<main className="page__container">
      <h1> Home Page </h1>
      {dsp}
    </main>);
  }
}

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
  success: React.PropTypes.bool,
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
