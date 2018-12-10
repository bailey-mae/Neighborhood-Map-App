//sidebar.js

import React from 'react';
import _ from 'lodash';


export default class SideBar extends React.Component {



 filterTodo(e)
  {
     var updatedList = this.props.venues;
    updatedList = updatedList.filter((item =>{
      return item.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    }) );
       this.setState({
      todos: updatedList,
    });
    if (updatedList == 0 ) {
      this.setState({
      message: true,
    });
    } else {
      this.setState({
      message: false,
    });
}}

  render(){
  let venues = this.props.venues.map((venue) =>
    venue.venue);

    venues =_.sortBy(venues, ['name']);

  const listItems = venues.map((venue) =>
    <li key={venue.id}>{venue.name}</li>
  );
  return (
    <div>
    <ul>{listItems}</ul>
     <input type="text"
        placeholder="Filter here..."
        onChange={this.filterTodo}
      />
    </div>
  );
  }
}




