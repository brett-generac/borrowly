import React, { Component } from "react";
import Map from "../../components/Map";
import { createThing } from "../../services/thing";

class CreateThingView extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      name: "",
      description: "",
      photo: null,
      coordinates: []
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

  handleMapClick = (eventLatLng) => {
    const lng = eventLatLng.lng();
    const lat = eventLatLng.lat();
    const coordinates = [lng, lat];
    this.setState({
      coordinates
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
      <main>
        <div>
          <div className="left">
            <section>
              <form onSubmit={this.handleFormSubmit}>
                <h3>
                  Let folks borrow your unused <span className="orange">thing</span>
                </h3>
                <hr />
                <div className="form-group">
                  <label htmlFor="category-select">Category</label>
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
                <h5 className="orange">Click a spot on the map where folks can pick-up the thing</h5>
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
                <button className="btn btn-primary">Contribute</button>
              </form>
            </section>
          </div>
          <Map view="create" center={this.props.coordinates} handleMapClick={this.handleMapClick} />
        </div>
      </main>
    );
  }
}

export default CreateThingView;
