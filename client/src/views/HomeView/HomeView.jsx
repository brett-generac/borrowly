import React, { Component } from "react";
import "./HomeView.css";
import { getCoordinates } from "../../services/geocoder";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      location: ""
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    getCoordinates(this.state.location)
      .then((data) => {
        const lng = data.results[0].geometry.location.lng;
        const lat = data.results[0].geometry.location.lat;
        const location = data.results[0].address_components[0].long_name;
        const coordinates = [lng, lat];
        this.props.handleLocationUpdate(location, coordinates);
        this.props.handleCategoryUpdate(this.state.category);
      })
      .then(() => {
        this.props.history.push(`/things/list`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleNearby = (event) => {
    event.preventDefault();
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        const coordinates = [lng, lat];
        this.props.handleLocationUpdate(coordinates);
        this.props.handleCategoryUpdate(this.state.category);
      },
      (error) => {
        console.log(error);
      }
    );
    this.props.history.push(`/things/list`);
  };

  render() {
    return (
      <div className="main">
        <div className="container-no-map">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="category-select">Category</label>
              <select
                className="form-control"
                id="category-select"
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                <option value="all the things">all the things</option>
                <option value="art things">art things</option>
                <option value="athletic things">athletic things</option>
                <option value="auto things">auto things</option>
                <option value="clothing things">clothing things</option>
                <option value="collectible things">collectible things</option>
                <option value="electronic things">electronic things</option>
                <option value="equipment things">equipment things</option>
                <option value="furniture things">furniture things</option>
                <option value="household things">household things</option>
                <option value="music things">music things</option>
                <option value="media things">media things</option>
                <option value="recreation things">recreation things</option>
                <option value="tool things">tool things</option>
                <option value="toy things">toy things</option>
                <option value="yard things">yard things</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="location-input">Location</label>
              <input
                className="form-control"
                id="location-input"
                type="text"
                name="location"
                placeholder="Whereabouts?"
                value={this.state.location}
                onChange={this.handleInputChange}
              />
            </div>
            <button className="btn btn-primary">Search Things</button>
          </form>
          <section>
            <h3>Sharing Is Caring</h3>
            <p>
              Borrowly is a secure community where folks let other folks borrow things, no strings attached. Discover
              what the nice folks nearby have up for grabs.
            </p>
            <form className="nearby-form" onSubmit={this.handleNearby}>
              <button className="btn btn-primary">Nearby Things</button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
