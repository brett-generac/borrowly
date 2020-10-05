import React, { Component } from "react";
import { signUp } from "../../services/auth";

class SignUpView extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
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
  render() {
    return (
      <main>
        <div className="container center">
          <div className="form-wrapper">
            <section>
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
                    placeholder="Your password"
                    minLength="6"
                    required
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
                <button className="btn btn-primary">Sign Up</button>
              </form>
            </section>
          </div>
        </div>
      </main>
    );
  }
}

export default SignUpView;
