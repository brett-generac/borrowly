import React, { Component } from "react";
import "../MapView.css";
import Map from "../../components/Map/Map";
import ErrorMessage from "../../components/ErrorMessage";
import { loadThing } from "../../services/thing";
import { editThing } from "../../services/thing";

class EditThingView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      category: "",
      name: "",
      description: "",
      photo: null,
      coordinates: [],
      photoUrl: "",
      error: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadThing(id)
      .then((data) => {
        const { category, name, description, photoUrl } = data.thing;
        const coordinates = data.thing.location.coordinates;
        this.setState({
          loaded: true,
          thing: data.thing,
          category,
          name,
          description,
          photoUrl,
          coordinates
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
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
    const id = this.props.match.params.id;
    const { category, name, description, photo, coordinates, photoUrl } = this.state;
    const body = { category, name, description, photo, coordinates, photoUrl };
    try {
      const data = await editThing(id, body);
      if (!data.edited) throw new Error("Unable to edit that thing");
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
        {(this.state.loaded && (
          <div>
            <div className="left">
              <form onSubmit={this.handleFormSubmit}>
                <h3>
                  Edit your <span className="orange">thing</span>
                </h3>
                <hr />
                <div id="category-form-group" className="form-group">
                  <label htmlFor="category-select">Edit category</label>
                  <select
                    className="form-control"
                    id="category-select"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleInputChange}
                  >
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
                  <label htmlFor="type-input">Edit name</label>
                  <input
                    className="form-control"
                    id="type-input"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description-input">Edit description</label>
                  <textarea
                    className="form-control"
                    id="description-input"
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  />
                </div>
                <h5 className="orange">Click a spot on the map to change the location of your thing</h5>
                <img id="edit-img" src={this.state.photoUrl} alt={this.state.name} />
                <div className="form-group">
                  <label htmlFor="photo-input">Edit photo</label>
                  <input
                    className="form-control-file"
                    id="photo-input"
                    type="file"
                    name="photo"
                    onChange={this.handlePhotoChange}
                  />
                </div>
                <button className="btn btn-warning">Edit Thing</button>
              </form>
            </div>
            <Map
              view="edit"
              center={this.state.thing.location.coordinates}
              marker={this.state.thing}
              handleMapClick={this.handleMapClick}
            />
          </div>
        )) || (
          <div>
            <div className="left">
              <h3 className="loading">Loading...</h3>
            </div>
            <div className="map-loading"></div>
          </div>
        )}
        {this.state.error && (
          <ErrorMessage
            classToAdd="error-side"
            message={this.state.error.message}
            handleClearError={this.handleClearError}
          />
        )}
      </main>
    );
  }
}

export default EditThingView;
