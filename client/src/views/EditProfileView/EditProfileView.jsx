import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loadProfile } from "../../services/profile";

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
    return <div className="container">Profile</div>;
  }
}
export default ProfileView;
