import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    this.renderMap ()
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
      query: "food",
      near: "Frederick",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items)
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

