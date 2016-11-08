import React from 'react';
import fetch from 'isomorphic-fetch';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      error: false,
      answers: ['', ''],
      sending: false,
      success: false,
    };
    this.addAnswer = this.addAnswer.bind(this);
    this.rmAnswer = this.rmAnswer.bind(this);
    this.editAnswer = this.editAnswer.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.submit = this.submit.bind(this);
  }
  addAnswer(event, index) {
    event.preventDefault();
    const arr = [].concat(this.state.answers);
    arr.splice(index + 1, 0, '');
    this.setState({ answers: arr });
  }
  editAnswer(event, index) {
    event.preventDefault();
    const arr = [].concat(this.state.answers);
    arr[index] = event.target.value;
    if (this.state.error !== false && this.state.error.type === 'answers') {
      this.setState({
        error: false,
        answers: arr,
      });
    } else {
      this.setState({
        answers: arr,
      });
    }
  }
  rmAnswer(event, index) {
    event.preventDefault();
    const arr = [].concat(this.state.answers);
    if (arr.length >= 3) {
      this.setState({
        answers: arr.filter((d, i) => index !== i),
      });
    }
  }
  editQuestion(event) {
    event.preventDefault();
    if (this.state.error !== false && this.state.error.type === 'question') {
      this.setState({
        error: false,
        question: event.target.value,
      });
    } else {
      this.setState({ question: event.target.value });
    }
  }
  submit(event) {
    event.preventDefault();
    const question = this.state.question.trim();
    const answers = this.state.answers.map(
      d => d.trim()
    ).filter(d => (d !== ''));

    if (question === '') {
      this.setState({
        error: {
          type: 'question',
          message: 'A Question must be provided',
        },
      });
    } else if (answers.length <= 1) {
      this.setState({
        error: {
          type: 'answers',
          message: 'Two Answers or more required',
        },
      });
    } else {
       // Handle Submition logic here
      this.setState({
        error: false,
        sending: true,
        question,
        answers,
      }, this.sendData);
    }
  }
  sendData() {
    fetch('/api/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: this.state.question,
        answers: this.state.answers,
      }),
    }).then((res) => {
      if (res.status >= 400) {
        this.setState({
          error: {
            type: 'submit',
            message: 'Bad response from server',
          },
        });
      }
      return res.json();
    }).then((json) => {
      console.log(json);
      this.setState({
        success: true,
        sending: false,
      });
    });
  }
  render() {
    let msg = (<div />);
    if (this.state.error !== false) {
      msg = (
        <div className="form__error">
          {this.state.error.message}
        </div>
      );
    }
    return (<div> Add new poll form
      <form className="form" onSubmit={this.submit}>
        <div className="form__header">Poll Question</div>
        <input
          type="text"
          tabIndex="0"
          className="question__input"
          placeholder="Add poll question here"
          value={this.state.question}
          onChange={this.editQuestion}
          required
        />
        <div className="form__header">Answers
          {this.state.answers.map((d, i) => (
            <div key={i}>
              <input
                type="text"
                tabIndex="0"
                value={d}
                className="form__question"
                onChange={e => this.editAnswer(e, i)}
                required
              />
              <button
                tabIndex="0"
                className="form__plus"
                onClick={e => this.addAnswer(e, i)}
              >+</button>
              <button
                tabIndex="0"
                className="form__cross"
                onClick={e => this.rmAnswer(e, i)}
              >-</button>
            </div>
          ))}
        </div>
        <div className="form__footer">
          {msg}
          <button
            type="submit"
            className="form__submit"
          >Submit</button>
        </div>
      </form>
    </div>);
  }
}

export default Container;
