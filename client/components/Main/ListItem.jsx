import React from 'react';
import { Link } from 'react-router';
/*
const ListItem = props => (
  <div className="listitem">
  {console.log(props)}
    <Link
      to={{ pathname: `/poll/${props.uuid}` }}
      className="listitem__header"
    >{props.title}</Link>
  </div>
);
*/
const ListItem = ({ uuid, title }) => (
  <div className="listitem">
    <Link to={`/poll/${uuid}`} className="listitem__header">{title}</Link>
  </div>
);

ListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  uuid: React.PropTypes.string.isRequired,
};

export default ListItem;
