import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.renderMap ()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAGlDDI4IhHVNMooY1WCGtTb6TSGmRnv9Q&callback=initMap")
    window.initMap = this.initMap
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

