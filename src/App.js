import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SideBar from './sidebar.js';
import ErrorBoundary from './errorBoundary';

class App extends Component {

  constructor(props) {
    super(props);
    this.filterVenues = this.filterVenues.bind(this)
  }

  state = {
    venues: [],
    filteredVenueIds: []
  }

  componentDidMount() {
    this.getVenues ()
  }


//render map with google api
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAGlDDI4IhHVNMooY1WCGtTb6TSGmRnv9Q&callback=initMap")
    window.initMap = this.initMap
  };


//foursqaure api to get sushi places in Frederick, MD and addresses
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "1FSWOD3MHOO1XYMP5ESSXGDRJHEWMD3QMZWQIWYMA0G433C5",
      client_secret: "FIJNBNPGLBMLRL0HY52UVXUIQF2KOHISCKOUVXB4OLFCH3JJ",
      query: "sushi",
      near: "Frederick",
      v: "20182507"
  }


//axios for xmlhttp requests and error handling - similar to fetch - handles async request between Foursquare and application
  axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      let venues = response.data.response.groups[0].items.map(item => item.venue)
      this.setState({
        venues,
         filteredVenueIds : venues.map (item => item.id)
      }, this.renderMap())
     })
    .catch(error => {
      alert(`Sorry, fetching data from Foursquare was not possible!`)
      console.log("So sorry, the following FourSquare error occured " + error)

    })
  }


//filter venues
  filterVenues = (query) => {
    let filteredVenueIds;
    if (!query) {
      filteredVenueIds = this.state.venues.map (item => item.id)
    } else {
          filteredVenueIds=this.state.venues.filter (item => {
          return item.name.toLowerCase ().indexOf(query.toLowerCase())  >= 0;
          }) .map(item => item.id);
      }
      this.setState({filteredVenueIds}, this.drawMarkers);
   }


//initialize map with markers and info windows
  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.40840019, lng: -77.45889666},
      zoom: 12

    });

    this.drawMarkers();
  }


  drawMarkers = () => {
    const venues = this.getFilteredVenues();

    const currentMarkers = this.state.markers || [];

    const shown = [];

    currentMarkers.forEach((marker) => {
      if(venues.includes(marker.venue)){
      // the marker is already on the map and should stay there
      shown.push(marker);
      return;
    }

    // clear the marker from the map
    marker.marker.setMap(null);
    });

    venues.forEach(venue => {
      if(shown.find(marker => marker.venue === venue)){
      // don't redraw a marker that is already on the map
      return;
      }

      shown.push({
        venue: venue,
        // draw the marker since it's not on the map
        marker: this.createMarker(venue)
      });
    })

    //saving markers in state for the next draw
    this.setState({markers: shown});
  }


  createMarker = (markVenue) => {
    //sets custom marker icon
    var markerIcon = {
    url: 'https://image.flaticon.com/icons/png/128/786/786903.png',
    scaledSize: new window.google.maps.Size(60, 60),
    origin: new window.google.maps.Point(0, 0), // used if icon is a part of sprite, indicates image position in sprite
    anchor: new window.google.maps.Point(20,40) // lets offset the marker image
    };

    const marker= new window.google.maps.Marker({
      position: {lat: markVenue.location.lat, lng: markVenue.location.lng},
      map: this.map,
      venue: markVenue,
      id: markVenue.id,
      name: markVenue.name,
      animation: window.google.maps.Animation.DROP,
      icon: markerIcon
    });

    const self = this;
      // click marker event listener
      marker.addListener('click', function() {
        self.drawInfoWindow(markVenue);
      });

    return marker
  }


//draws infowindow
  drawInfoWindow = (markVenue) => {
    if (this.state.activeInfoWindow) this.state.activeInfoWindow.close();

    //create info window
    var infowindow = new window.google.maps.InfoWindow()

    // locate the marker for the window
    const marker = this.state.markers.find(marker => marker.venue === markVenue);

    const contentString = `${markVenue.name + `<br>` + markVenue.location.address + `<br>` + `<i>data provided by Foursquare`}`

    //content of infowindow
    infowindow.setContent(contentString)
    //open an infowindow
    infowindow.open(this.map, marker.marker)
    // persist state of drawn marker in component
    this.setState({activeInfoWindow:infowindow});
  }


getFilteredVenues = () => this.state.venues.filter(venue => this.state.filteredVenueIds.includes(venue.id))


  render () {
  let venues = this.getFilteredVenues()
    if (this.state.hasError) {
      return <div id="Error-message" aria-label="Error message">Sorry, something went wrong!</div>
    } else {
      return (
        <main id="container">
          <ErrorBoundary>
          <div id="App" aria-label="App">
            <SideBar venues={venues} filterVenues={this.filterVenues}
             onClickText={this.drawInfoWindow}>
            </SideBar>
          </div>
          <div id="map" aria-label="map" role="application"></div>
          </ErrorBoundary>
        </main>
      )
    }
  }}

  //javascript for google api request
  function loadScript (url) {
    var index =
      window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default App;




