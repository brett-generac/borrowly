import React, { Component } from "react";
import "../MapView.css";
import Map from "../../components/Map/Map";
import ErrorMessage from "../../components/ErrorMessage";
import { createThing } from "../../services/thing";

class CreateThingView extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      name: "",
      description: "",
      photo: null,
      coordinates: [],
      error: null
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    this.setState({ photo });
  };

  handleMapClick = (eventLatLng) => {
    const lng = eventLatLng.lng();
    const lat = eventLatLng.lat();
    const coordinates = [lng, lat];
    this.setState({ coordinates });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { category, name, description, photo, coordinates } = this.state;
    const body = { category, name, description, photo, coordinates };
    const hasRequired = Object.keys(body).every((property) => body[property]);
    try {
      if (!hasRequired) throw new Error("All fields are required");
      const data = await createThing(body);
      const id = data.thing._id;
      this.props.history.push(`/things/${id}`);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <main>
        <div>
          <div className="left">
            <form onSubmit={this.handleFormSubmit}>
              <h3>
                Let folks borrow your unused <span className="orange">thing</span>
              </h3>
              <hr className="thick" />
              <div id="category-form-group" className="form-group">
                <label htmlFor="category-select">Category</label>
                <select
                  className="form-control"
                  id="category-select"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleInputChange}
                >
                  <option></option>
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
                  <option value="other things">other things</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="type-input">Name</label>
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
                <label htmlFor="description-input">Description</label>
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
              <h5 className="orange">Click the spot on the map where folks can pick-up your thing</h5>
              <div className="form-group">
                <label htmlFor="photo-input">Upload a photo</label>
                <input
                  className="form-control-file"
                  id="photo-input"
                  type="file"
                  name="photo"
                  onChange={this.handlePhotoChange}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Contribute
              </button>
            </form>
            {this.state.error && (
              <ErrorMessage
                classToAdd="error-side"
                message={this.state.error.message}
                handleClearError={this.handleClearError}
              />
            )}
          </div>
          <Map view="create" center={this.props.coordinates} handleMapClick={this.handleMapClick} />
        </div>
      </main>
    );
  }
}

export default CreateThingView;
