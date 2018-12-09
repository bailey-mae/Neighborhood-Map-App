import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues ()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAGlDDI4IhHVNMooY1WCGtTb6TSGmRnv9Q&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "1FSWOD3MHOO1XYMP5ESSXGDRJHEWMD3QMZWQIWYMA0G433C5",
      client_secret: "FIJNBNPGLBMLRL0HY52UVXUIQF2KOHISCKOUVXB4OLFCH3JJ",
      query: "sushi",
      near: "Frederick",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("So sorry, the following error occured " + error)

      })
  }

  initMap = () => {
          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 39.4219709802915, lng: -77.4121168197085},
            zoom: 13
          });

          this.state.venues.map(markVenue => {

            var contentString = '${markVenue.venue.name}'

            var infowindow = new window.google.maps.InfoWindow({
              content: contentString
            });

            var marker = new window.google.maps.Marker({
              position: {lat: markVenue.venue.location.lat, lng: markVenue.venue.location.lng},
              map: map,
            });

          })

  }


  render () {
    return (
      <main>
      <div id="map"></div>
      </main>
    )
  }
}



function loadScript (url) {
  var index =
    window.document.getElementsByTagName("script")
    [0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;

