import React from 'react';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answers: [''],
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
    this.setState({ answers: arr });
  }
  rmAnswer(event, index) {
    event.preventDefault();
    const arr = [].concat(this.state.answers);
    if (arr.length > 1) {
      this.setState({
        answers: arr.filter((d, i) => index !== i),
      });
    }
  }
  editQuestion(event) {
    event.preventDefault();
    this.setState({ question: event.target.value });
  }
  submit(event) {
    event.preventDefault();
    const question = this.state.question.trim();
    const answers = this.state.answers.map(
      d => d.trim()
    ).filter(d => (d !== ''));
    console.log(`Question: ${question}`);
    console.log(`Answers: ${answers}`);
  }

  render() {
    return (<div> Add new poll form
      <form onSubmit={this.submit} className="form">
        <div className="form__header">Poll Question</div>
        <input
          tabIndex="0"
          className="question__input"
          placeholder="Add poll question here"
          value={this.state.question}
          onChange={this.editQuestion}
        />
        <div className="form__header">Answers
          {this.state.answers.map((d, i) => (
            <div>
              <input
                tabIndex="0"
                key={i}
                value={d}
                className="form__question"
                onChange={e => this.editAnswer(e, i)}
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
          <button
            className="form__submit"
            onClick={this.submit}
          >Submit</button>
        </div>
      </form>
    </div>);
  }
}

export default Container;
