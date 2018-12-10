//sidebar.js

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class SideBar extends React.Component {

static propTypes = {
  venues: PropTypes.array,
  filterVenues : PropTypes.func,
}

  constructor(props) {
    super(props);
  }

  filterVenues = (evt) => {
    evt.preventDefault();
    this.props.filterVenues(evt.target.value);
  }

  render(){

    let venues =_.sortBy(this.props.venues, ['name']);

  const listItems = venues.map((venue) =>
    <li key={venue.id}>{venue.name}</li>
  );
  return (
    <div>
    <ul>{listItems}</ul>
    <input type="text"
        placeholder="Filter here..."
        onChange={this.filterVenues}
      />
    </div>
  );
  }
}


export default SideBar;

