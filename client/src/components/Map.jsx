import React, { Component } from "react";
import { getContent } from "../services/content";
import "../styles/Map.css";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      marker: null,
      markers: []
    };
  }

  googleMapRef = React.createRef();

  componentDidMount() {
    const mapScript = document.createElement("script");
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    mapScript.id = "google-maps-api";
    document.body.appendChild(mapScript);
    mapScript.addEventListener("load", () => {
      this.createMap();
      if (this.props.marker) {
        this.setMarker();
      } else if (this.props.markers) {
        this.setMarkers();
      } else {
        window.google.maps.event.addListener(this.state.map, "click", (event) => {
          this.clearMarkers();
          this.createMarker(event.latLng);
          this.props.handleMapClick(event.latLng);
        });
      }
    });
  }

  componentWillUnmount() {
    const mapScript = document.getElementById("google-maps-api");
    document.body.removeChild(mapScript);
  }

  createMap() {
    let mapOptions = {
      zoom: 4,
      center: {
        lat: 39.83,
        lng: -98.59
      },
      disableDefaultUI: true,
      gestureHandling: "greedy"
    };
    if (this.props.center) {
      mapOptions.zoom = 12;
      mapOptions.center.lat = this.props.center[1];
      mapOptions.center.lng = this.props.center[0];
    }
    const map = new window.google.maps.Map(this.googleMapRef.current, mapOptions);
    this.setState({
      map
    });
  }

  createMarker(coordinates) {
    const marker = new window.google.maps.Marker({
      position: coordinates,
      map: this.state.map
    });
    const markers = [...this.state.markers];
    markers.push(marker);
    this.setState({
      markers
    });
  }

  clearMarkers() {
    for (let marker of this.state.markers) {
      marker.setMap(null);
      this.setState({
        markers: []
      });
    }
  }

  setMarkers() {
    for (let marker of this.props.markers) {
      const coordinates = {
        lat: marker.location.coordinates[1],
        lng: marker.location.coordinates[0]
      };
      const mapMarker = new window.google.maps.Marker({
        position: coordinates,
        map: this.state.map,
        title: marker.name
      });
      const content = getContent(marker);
      const infoWindow = new window.google.maps.InfoWindow({
        content
      });
      mapMarker.addListener("mouseover", () => {
        infoWindow.open(this.state.map, mapMarker);
      });
      mapMarker.addListener("mouseout", () => {
        infoWindow.close();
      });
    }
  }

  setMarker() {
    const coordinates = {
      lat: this.props.marker.location.coordinates[1],
      lng: this.props.marker.location.coordinates[0]
    };
    this.createMarker(coordinates);
  }

  render() {
    return (
      <div className="map-wrapper">
        <div id="map" ref={this.googleMapRef} />
      </div>
    );
  }
}

export default Map;
