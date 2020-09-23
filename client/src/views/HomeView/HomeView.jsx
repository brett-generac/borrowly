import React, { Component } from "react";
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
        const coordinates = [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat];
        this.props.handleLocation(coordinates);
        this.props.handleCategory(this.state.category);
      })
      .then(() => {
        this.props.history.push(`/things/list`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="category-select">Category:</label>
            <select
              className="form-control"
              id="category-select"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              <option value="automotive">automotive</option>
              <option value="electronics">electronics</option>
              <option value="clothing">clothing</option>
              <option value="furniture">furniture</option>
              <option value="heavy equipment">heavy equipment</option>
              <option value="media">media</option>
              <option value="recreation">recreation</option>
              <option value="tools">tools</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location-input">Location</label>
            <input
              className="form-control"
              id="location-input"
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleInputChange}
            />
          </div>
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
    );
  }
}

export default Home;
