import React, { Component } from "react";
import { signUp } from "../../services/auth";

//edge case, able to create two users with same email

class SignUpView extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      showPassword: false
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const body = { name, email, password };
    const data = await signUp(body);
    const user = data.user;
    this.props.handleUserUpdate(user);
    this.props.history.push("/about");
  };

  togglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    return (
      <main>
        <div className="container center">
          <div className="row form-wrapper">
            <div className="col">
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
                    type={this.state.showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Your password"
                    minLength="6"
                    required
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-check mb-4">
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
                <button className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default SignUpView;
