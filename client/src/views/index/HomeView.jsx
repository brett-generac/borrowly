import React, { Component } from "react";
import "../../styles/HomeView.css";
import { getInputCoordinates } from "../../services/geocoder";
import { getUserCoordinates } from "../../services/geocoder";
import { getUserLocation } from "../../services/geocoder";

export class HomeView extends Component {
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

  handleSearchSubmit = (event) => {
    event.preventDefault();
    getInputCoordinates(this.state.location)
      .then((data) => {
        const lng = data.results[0].geometry.location.lng;
        const lat = data.results[0].geometry.location.lat;
        const location = data.results[0].address_components[0].long_name;
        const coordinates = [lng, lat];
        this.props.handleCoordinatesUpdate(coordinates);
        this.props.handleLocationUpdate(location);
        this.props.handleCategoryUpdate(this.state.category);
      })
      .then(() => {
        this.props.history.push(`/things/list`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleNearbySubmit = (event) => {
    event.preventDefault();
    getUserCoordinates()
      .then((data) => {
        const lng = data.coords.longitude;
        const lat = data.coords.latitude;
        const coordinates = [lng, lat];
        this.props.handleCoordinatesUpdate(coordinates);
        return getUserLocation(coordinates);
      })
      .then((data) => {
        const location = data.results[0].address_components[2].long_name;
        this.props.handleLocationUpdate(location);
        this.props.history.push(`/things/list`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <main id="home-main">
        <div className="container center">
          <div className="wrapper">
            <section id="top">
              <form onSubmit={this.handleSearchSubmit}>
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
                <button className="btn btn-info">Search Things</button>
              </form>
            </section>
            <section id="bottom">
              <h3 id="sharing">Sharing Is Caring</h3>
              <p>
                Borrowly is a community for lending/borrowing things, no strings attached. Discover what the nice folks
                nearby have up for grabs.
              </p>
              <form onSubmit={this.handleNearbySubmit}>
                <button className="btn btn-info">Nearby Things</button>
              </form>
            </section>
          </div>
        </div>
      </main>
    );
  }
}

export default HomeView;
