import React, { Component } from "react";
import "../CenterView.css";

class ProfileView extends Component {
  constructor(props) {
    super();
    this.state = {
      editMode: false,
      name: props.user.name,
      email: props.user.email,
      password: ""
    };
  }

  handleEditClick = (event) => {
    event.preventDefault();
    this.setState({
      editMode: true
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const body = { name, email, password };
  };

  render() {
    const favors = this.props.user.favors === 1 ? "favor" : "favors";
    return (
      <main>
        <div className="container view-wrapper">
          <div className="row">
            <div className="col">
              <h1>
                Howdy, <span className="orange">{this.props.user.name}</span>.
              </h1>
              <hr className="thick" />
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <h3>
                You have <b>{this.props.user.favors}</b> <span className="orange">{favors}</span> to ask.
              </h3>
            </div>
            <div className="col-3">
              {!this.state.editMode && (
                <button className="btn btn-warning" onClick={this.handleEditClick}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              {(this.state.editMode && (
                <form onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="input-name">Name</label>
                    <input
                      className="form-control"
                      id="input-name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-email">Email</label>
                    <input
                      className="form-control"
                      id="input-email"
                      type="email"
                      name="email"
                      placeholder="Your email"
                      required
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="input-password">Password</label>
                    <input
                      className="form-control"
                      id="input-password"
                      type="password"
                      name="password"
                      placeholder="New password"
                      minLength="6"
                      required
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <button className="btn btn-warning">Edit Profile</button>
                </form>
              )) || (
                <div>
                  <div className="form-group">
                    <label>Name</label>
                    <p className="profile-p">{this.props.user.name}</p>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <p className="profile-p">{this.props.user.email}</p>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <p className="profile-p">XXXXXX</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default ProfileView;
