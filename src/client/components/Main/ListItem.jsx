import React from 'react';

const ListItem = props => (
  <div className="ListItem">{props.title}</div>
);
ListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default ListItem;
