import React from 'react';
import ListItem from './ListItem';

const PollList = ({ data }) => (
  <section>{
    (data.length === 0) ? (
      <div>No Polls To Show</div>
    ) : (data.map(d => (
      <ListItem key={d.id} uuid={d.id} title={d.question} />
    ))
  )}</section>
);
PollList.propTypes = {
  data: React.PropTypes.array,
};

export default PollList;
