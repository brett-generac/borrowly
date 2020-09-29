import React, { Component } from "react";
import Map from "../../components/Map/Map";
import List from "../../components/List/List";
import { loadThings } from "../../services/thing";

export class ListThings extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      things: []
    };
  }

  componentDidMount() {
    const { coordinates, category } = this.props;
    loadThings(coordinates, category).then((data) => {
      this.setState({
        loaded: true,
        things: data.things
      });
    });
  }

  //this view gets error b/c includes googlemaps scripts multiple times, no problems caused by it yet

  render() {
    const string = this.props.category ? `${this.props.category}` : "Things";
    return (
      <div className="main">
        {this.state.loaded && (
          <div className="container-map">
            <h3>
              {string} in {this.props.location}
            </h3>
            <small>{this.state.things.length} things</small>
            <hr />
            <List items={this.state.things} />
            <Map center={this.props.coordinates} markers={this.state.things} />
          </div>
        )}
      </div>
    );
  }
}

export default ListThings;
