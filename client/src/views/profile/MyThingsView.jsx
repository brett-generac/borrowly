import React, { Component } from "react";
import ThingsList from "../../components/ThingsList";
import { loadMyThings } from "../../services/thing";
import { deleteThing } from "../../services/thing";

class MyThingsView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      things: []
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

  handleDeleteSubmit = (event) => {
    event.preventDefault();
    const body = {
      id: this.state.thing._id
    };
    deleteThing(body)
      .then(() => {
        this.props.history.push("/things/list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let things = 0;
    if (this.state.loaded) {
      things = this.state.things.length;
    }
    return (
      <main>
        <div className="container">
          <div className="center">
            {(this.state.loaded && (
              <div className="view-wrapper">
                <h1>
                  Howdy, <span className="orange">{this.props.user.name}</span>.
                </h1>
                <h5>You have {things} things up for grabs</h5>
                <hr className="thick" />
                <ThingsList things={this.state.things} />
              </div>
            )) || (
              <div className="view-wrapper">
                <div className="loading">
                  <h3>Loading...</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}
export default MyThingsView;
