import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { receive } from '../../actions/CreateUserAccount';
/* To do
* Write a form
* inputs:
* name, email, password, and an array of votes
* Attach CreateUserAccount actions to it
*/
/* Note it might be easeir to make this a subapp */
class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
    this.success = this.success.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      email: '',
      password: '',
      error: null,
      isFetching: false,
      success: null,
    };
  }
  reset() {
    this.setState({ name: '', email: '', password: '' });
  }
  submit(event) {
    event.preventDefault();
    const { name, password, email } = this.state;
    const votes = this.props.votes;
    this.setState({ isFetching: true });
    fetch('/api/signup', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password, email, votes }),
    }).then((res) => {
      if (res.status >= 400) {
        this.setState({
          isFetching: false,
          error: {
            message: 'Bad response creating account',
          },
        });
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return this.setState({
          isFetching: false,
          error: json.payload,
        });
      } return this.setState({
        isFetching: false,
        success: json.payload,
      }, this.success);
    }).catch(e => this.setState({ error: e }));
  }
  success() {
    this.props.onSuccess(this.state.success);
    this.context.router.push('/user/account');
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (<div className="signup">
      <form className="signup__form" onSubmit={this.submit} >
        <label htmlFor="name">Name</label>
        <input
          name="name" type="text" id="name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="email">Email Address</label>
        <input
          name="email" type="email" id="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          name="password" type="password" id="password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />{(
          this.state.error
        ) ? (
          <div className="form__error">
            {this.state.error.message}
          </div>
        ) : (
          <div />
        )}<div className="form__footer">
          <button
            type="submit"
            className="form__submit"
          >Submit</button>
          <button
            type="reset"
            className="form__reset"
            onClick={this.reset}
          >Cancel</button>
        </div>
      </form>
    </div>);
  }
}
Signup.propTypes = {
  votes: React.PropTypes.array.isRequired,
//  handleSubmit: React.PropTypes.func.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
//  onError: React.PropTypes.func.isRequired,
};
Signup.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  votes: state.votes,
});

const mapDispatchToProps = dispatch => ({
//  handleSubmit: payload => dispatch(createUserAccount(payload)),
  onSuccess: payload => dispatch(receive(payload)),
//  onError: payload => dispatch(error(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
