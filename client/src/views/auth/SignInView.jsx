import React, { Component } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import { signIn } from "../../services/auth";

class SignInView extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: null
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = { email, password };
    try {
      const data = await signIn(body);
      const user = data.user;
      this.props.handleUserUpdate(user);
      this.props.history.push("/");
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <main>
        <div className="container center">
          <div className="row form-wrapper">
            <div className="col">
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

export default SignInView;
