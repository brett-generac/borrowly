import React, { Component } from "react";
import "../CenterView.css";
import ThingsList from "../../components/Lists/ThingsList";
import ErrorMessage from "../../components/ErrorMessage";
import { loadMyThings } from "../../services/thing";
import { deleteThing } from "../../services/thing";

class MyThingsView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      things: [],
      error: null
    };
  }

  componentDidMount() {
    loadMyThings().then((data) => {
      this.setState({
        loaded: true,
        things: data.things
      });
    });
  }

  handleDeleteSubmit = async (event, id) => {
    event.preventDefault();
    const body = { id };
    try {
      const data = await deleteThing(body);
      if (!data.deleted) throw new Error("Unable to delete thing");
      const things = [...this.state.things];
      const index = things.findIndex((element) => element._id === id);
      things.splice(index);
      this.setState({ things });
    } catch (error) {
      this.setState({ error });
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  render() {
    let numThings = 0;
    let things = "";
    if (this.state.loaded) {
      numThings = this.state.things.length;
      things = numThings === 1 ? "thing" : "things";
    }
    return (
      <main>
        <div className="container view-wrapper">
          <div className="row">
            {(this.state.loaded && (
              <div className="col">
                <h1>
                  Howdy, <span className="orange">{this.props.user.name}</span>.
                </h1>
                <h5>
                  You have {numThings} <span className="orange">{things}</span> up for grabs
                </h5>
                <hr className="thick" />
                <ThingsList things={this.state.things} handleDeleteSubmit={this.handleDeleteSubmit} />
              </div>
            )) || (
              <div className="col">
                <div className="loading">
                  <h3>Loading...</h3>
                </div>
              </div>
            )}
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
export default MyThingsView;
