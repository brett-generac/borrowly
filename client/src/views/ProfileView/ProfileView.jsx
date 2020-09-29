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

  componentDidMount() {
    console.log(this.props);
    const { user } = this.props;
    this.setState({
      loaded: true,
      user
    });
  }

  render() {
    return (
      <div className="main">
        {this.state.loaded && (
          <div className="container-no-map">
            <h3>Howdy, {this.state.user.name}.</h3>
            <p>You have {this.state.user.favors} favors.</p>
          </div>
        )}
      </div>
    );
  }
}
export default ProfileView;
