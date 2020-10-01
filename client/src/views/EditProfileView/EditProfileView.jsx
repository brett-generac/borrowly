import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import { loadProfile } from "../../services/profile";

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="main">
        {this.state.loaded && (
          <div className="container">
            <h1>Edit Profile</h1>
          </div>
        )}
      </div>
    );
  }
}
export default ProfileView;
