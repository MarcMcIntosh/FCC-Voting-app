import React from 'react';

const stats = ({ question, answers }) => (
  <div>
    <h2>{question}</h2>
    {answers.map((d, i) => (
      <div key={i}>
        <span>{d.answer}</span>
        <span>{d.votes}</span>
      </div>
    ))}
  </div>
);

stats.propTypes = {
  question: React.PropTypes.string.isRequired,
  answers: React.PropTypes.array.isRequired,
};

export default stats;
