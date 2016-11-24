import React from 'react';
import { connect } from 'react-redux';
import createUserAccount from '../../actions/CreateUserAccount';

/* To do
* Write a form
* inputs:
* name, email, password, and an array of votes
* Attach CreateUserAccount actions to it
*/
/* Note it might be easeir to make this a subapp */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '' };
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  reset() {
    this.setState({ name: '', email: '', password: '' });
  }
  submit() {
    this.props.handleSubmit({
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      votes: this.props.votes,
    });
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
        />
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
    </div>);
  }
}
Signup.propTypes = {
  votes: React.PropTypes.array.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  votes: state.votes,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: payload => dispatch(createUserAccount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
