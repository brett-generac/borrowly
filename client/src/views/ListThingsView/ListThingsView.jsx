import React, { Component } from "react";
import "./ListThingsView.css";
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
    const category = this.props.category ? `${this.props.category}` : "things";
    const capCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return (
      <div className="main">
        <div className="container-side">
          {this.state.loaded && (
            <div className="side">
              <small>{this.state.things.length} things</small>
              <h3>
                {capCategory} to borrow near {this.props.location}
              </h3>
              <hr />
              <List things={this.state.things} />
              <Map center={this.props.coordinates} markers={this.state.things} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ListThings;
