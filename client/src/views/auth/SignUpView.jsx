import React, { Component } from "react";
import { signUp } from "../../services/auth";

class SignUpView extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      inputType: "password"
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
    const { name, email, password } = this.state;
    const body = { name, email, password };
    signUp(body)
      .then((data) => {
        const { user } = data;
        this.props.handleUserUpdate(user);
        this.props.history.push("/about");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleToggle = (event) => {
    event.preventDefault();
    const inputType = this.state.inputType === "password" ? "text" : "password";
    this.setState({
      inputType
    });
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
                    type={this.state.inputType}
                    name="password"
                    placeholder="Your password"
                    minLength="6"
                    required
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-check mb-4">
                  <input className="form-check-input" id="input-toggle" type="checkbox" onChange={this.handleToggle} />
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
