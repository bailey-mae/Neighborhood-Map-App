import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 39.4219709802915,
         lng: -77.4121168197085
        }}
      />
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAGlDDI4IhHVNMooY1WCGtTb6TSGmRnv9Q'
})(MapContainer);
