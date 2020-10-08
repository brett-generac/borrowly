import React, { Component } from "react";
import ErrorView from "../views/index/ErrorView";

class ErrorHandler extends Component {
  constructor() {
    super();
    this.state = {
      catch: false,
      error: null,
      info: null
    };
  }

  static getDerivedSateFromError(error) {
    return {
      catch: true
    };
  }

  //not being called for some reason, architecture and everything else is good if only promise catch blocks can throw errors up to this
  componentDidCatch(error, info) {
    this.setState({
      catch: true,
      error,
      info
    });
  }

  render() {
    return this.state.catch ? <ErrorView error={this.state.error} info={this.state.info} /> : this.props.children;
  }
}

export default ErrorHandler;
