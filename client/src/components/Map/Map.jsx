import React, { Component } from "react";

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
    document.body.appendChild(mapScript);
    mapScript.addEventListener("load", () => {
      const map = this.createMap();
      // window.google.maps.event.addListener(map, "click", (event) => {
      //   this.createMarker(event.latLng);
      // });
      // this.setState({
      //   map
      // });
    });
  }

  createMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 12,
      center: {
        lat: this.props.center[1],
        lng: this.props.center[0]
      },
      disableDefaultUI: true,
      gestureHandling: "greedy"
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
    }
  }

  render() {
    return <div id="google-map" ref={this.googleMapRef} style={{ width: "100%", height: "100vh" }} />;
  }
}

export default Map;
