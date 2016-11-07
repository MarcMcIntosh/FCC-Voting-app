import React from 'react';
import ListItem from './ListItem';

const PollList = ({ data }) => (
  <section>{
    (data.length === 0) ? (
      <div>No Polls To Show</div>
    ) : (data.sort((a, b) => {
      const d1 = new Date(a);
      const d2 = new Date(b);
      if (d1 < d2) return -1;
      else if (d1 > d2) return 1;
      return 0;
    }).map(d => (
      <ListItem key={d.id} uuid={d.id} title={d.question} />
    ))
  )}</section>
);
PollList.propTypes = {
  data: React.PropTypes.array,
};

export default PollList;
