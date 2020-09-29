import React, { Component } from "react";
import Map from "../../components/Map/Map";
import { loadThing } from "../../services/thing";

export class SingleThingView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      thing: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    loadThing(id).then((data) => {
      this.setState({
        loaded: true,
        thing: data.thing
      });
    });
  }
  render() {
    return (
      <div className="main">
        {this.state.loaded && (
          <>
            <div className="container">
              <h3>{this.state.thing.name}</h3>
              <p>{this.state.thing.category}</p>
              <h3>{this.state.thing.description}</h3>
            </div>
            <Map center={this.state.thing.location.coordinates} marker={this.state.thing} />
          </>
        )}
      </div>
    );
  }
}

export default SingleThingView;
