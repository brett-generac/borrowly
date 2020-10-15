import React, { Component } from "react";
import "../CenterView.css";
import ErrorMessage from "../../components/ErrorMessage";
import { editMe } from "../../services/profile.js";

class MyProfileView extends Component {
  constructor(props) {
    super();
    this.state = {
      edit: false,
      name: props.user.name,
      email: props.user.email,
      password: "",
      showPassword: false,
      error: null
    };
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  togglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const body = { name, email, password };
    try {
      const data = await editMe(body);
      if (!data.user) throw new Error("Unable to edit profile");
      this.props.handleUserUpdate(data.user);
      this.setState({ edit: false });
    } catch (error) {
      this.setState({ error });
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  render() {
    const favors = this.props.user.favors === 1 ? "favor" : "favors";
    const password = this.state.edit ? "New Password" : "Password";
    const placeholder = this.state.edit ? "" : "••••••••";
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
                You have {this.props.user.favors} <span className="orange">{favors}</span> to ask.
              </h3>
            </div>
            <div className="col-3">
              {(this.state.edit && (
                <button id="profile-button" className="btn btn-secondary" onClick={this.toggleEdit}>
                  Back
                </button>
              )) || (
                <button id="profile-button" className="btn btn-warning" onClick={this.toggleEdit}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <form id="profile-form" onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="input-name">Name</label>
                  <input
                    className="form-control"
                    id="input-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    readOnly={!this.state.edit}
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
                    readOnly={!this.state.edit}
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="input-password">{password}</label>
                  <input
                    className="form-control"
                    id="input-password"
                    type={this.state.showPassword ? "text" : "password"}
                    name="password"
                    placeholder={placeholder}
                    minLength="6"
                    readOnly={!this.state.edit}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
                {this.state.edit && (
                  <>
                    <div className="mb-3">
                      <small>Change only the fields you want to edit</small>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        id="input-toggle"
                        type="checkbox"
                        onChange={this.togglePassword}
                      />
                      <label className="form-check-label" htmlFor="input-toggle">
                        Show password
                      </label>
                    </div>
                    <button className="btn btn-warning">Edit Profile</button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
        {this.state.error && (
          <ErrorMessage
            classToAdd="error-center"
            message={this.state.error.message}
            handleClearError={this.handleClearError}
          />
        )}
      </main>
    );
  }
}
export default MyProfileView;
