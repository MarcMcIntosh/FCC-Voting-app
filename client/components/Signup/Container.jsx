import React from 'react';
import { connect } from 'react-redux';
import createUserAccount from '../../actions/CreateUserAccount';

/* To do
* Write a form
* inputs:
* name, email, password, and an array of votes
* Attach CreateUserAccount actions to it
*/

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      password: undefined,
    };
  }
  reset() {
    this.setState({ name: undefined, email: undefined, password: undefined });
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
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const str = 'Sign-up form goes here';
    return (<div className="signup">
      {str}
      <form className="signup__form" onSubmit={this.submit} >
        <input
          name="name" type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          name="email" type="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          name="password" type="password"
          value={this.state.password}
          onChange={this.handleChange}
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
  votes: React.propTypes.array.isRequired,
  handleSubmit: React.propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  votes: state.votes,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: payload => dispatch(createUserAccount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
