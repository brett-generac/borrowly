import React, { Component } from "react";
import ErrorView from "../views/index/ErrorView";

class ErrorHandler extends Component {
  constructor() {
    super();
    this.state = {
      catch: false,
      error: null
    };
  }

  componentDidCatch(error) {
    this.setState({
      catch: true,
      error
    });
  }

  render() {
    return this.state.catch ? <ErrorView error={this.state.error} /> : this.props.children;
  }
}

export default ErrorHandler;
