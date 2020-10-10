import React, { Component } from "react";
import ErrorView from "../views/index/ErrorView";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      catch: false
    };
  }

  componentDidCatch(error) {
    this.setState({
      catch: true
    });
  }

  render() {
    return this.state.catch ? <ErrorView /> : this.props.children;
  }
}

export default ErrorBoundary;
