import React from 'react';

const ListItem = props => (
  <div className="listitem">
    <h2 className="listitem__header">{props.title}</h2>
    <div className="listitem__content">Stuff</div>
  </div>
);
ListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default ListItem;
