import React from 'react';
import { Link } from 'react-redux';

const ListItem = props => (
  <div className="listitem">
    <Link
      to={{ pathname: `/poll/${props.id}` }}
      className="listitem__header"
    >{props.title}</Link>
  </div>
);
ListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
};

export default ListItem;
