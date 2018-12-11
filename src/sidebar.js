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

state = {
    selectedItem: null
  }


  render(){

    let venues =_.sortBy(this.props.venues, ['name']);



  let listItems = venues.map((venue) =>
    <li key={venue.id} role="button" className="box" tabIndex="0"> {venue.name}
    </li>
  );
  return (
    <div>
    <h2>Sushi Frederick</h2>
    <input type="text"
        placeholder="Go Fishing..."
        onChange={this.filterVenues}
      />
      <ul>{listItems}</ul>
    </div>
  );
  }

}



export default SideBar;

