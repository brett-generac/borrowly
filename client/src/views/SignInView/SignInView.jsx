import React, { Component } from "react";
import { signIn } from "../../services/auth";

class SignInView extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
    const { email, password } = this.state;
    const body = { email, password };
    signIn(body)
      .then((data) => {
        const { user } = data;
        this.props.handleUserUpdate(user);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="main">
        <div className="container-center">
          <div className="center">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email-input">Email</label>
                <input
                  className="form-control"
                  id="email-input"
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
                  placeholder="Your password"
                  minLength="6"
                  required
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <button className="btn btn-primary">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInView;
