import React from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { receive } from '../../actions/SignInUser';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postSignIn = this.postSignIn.bind(this);
    this.success = this.success.bind(this);
    this.state = {
      email: '',
      password: '',
      error: null,
      isFetching: false,
      success: null,
    };
  }
  reset() {
    this.setState({ email: '', password: '', error: null });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  submit() {
    this.setState({ isFetching: true }, this.postSignIn);
  }
  postSignIn() {
    const { email, password } = this.state;
    const votes = this.props.votes;
    fetch('/api/signin', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, votes }),
    }).then((res) => {
      this.setState({ isFetching: false });
      if (res.status >= 400) {
        throw new Error('Bad response signing in user');
      } return res.json();
    }).then((json) => {
      if (!json.success) {
        return this.setState({ error: json.payload });
      } return this.setState({
        success: json.payload,
      }, this.success);
    }).catch(error => this.setState({ error }));
  }
  success() {
    this.props.onSuccess(this.state.success);
    this.context.router.push('/user/account');
  }
  render() {
    return (
      <div className="user__signin">
        <form className="signup__form" onSubmit={this.submit} >
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
          />{(this.state.error) ? (
            <div className="form__error">
              {this.state.error.message}
            </div>
          ) : (<div />)}
          <div className="form__footer">
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
      </div>
    );
  }
}

SignIn.propTypes = {
  votes: React.PropTypes.array.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
};

SignIn.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  votes: state.votes,
});

const mapDispatchToProps = dispatch => ({
  onSuccess: payload => dispatch(receive(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
