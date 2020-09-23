import React, { Component } from "react";
import Map from "../../components/Map/Map";
import { createThing } from "../../services/thing";

export class CreateThingView extends Component {
  constructor() {
    super();
    this.state = {
      category: "automotive",
      name: "",
      description: "",
      photo: null,
      coordinates: [-122.39867, 45.55554]
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    this.setState({
      photo
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { category, name, description, photo, coordinates } = this.state;
    const body = { category, name, description, photo, coordinates };
    createThing(body)
      .then((data) => {
        const id = data.document._id;
        this.props.history.push(`/things/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <form method="POST" onSubmit={this.handleFormSubmit}>
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
            <label htmlFor="type-input">Name:</label>
            <input
              className="form-control"
              id="type-input"
              type="text"
              name="name"
              placeholder="What is it?"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description-input">Description:</label>
            <textarea
              className="form-control"
              id="description-input"
              type="text"
              name="description"
              placeholder="What's it like?"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo-input">Photo:</label>
            <input
              className="form-control-file"
              id="photo-input"
              type="file"
              name="photo"
              onChange={this.handlePhotoChange}
            />
          </div>
          <button className="btn btn-primary">Add thing</button>
        </form>
        <Map center={this.props.coordinates} type="create" />
      </div>
    );
  }
}

export default CreateThingView;
