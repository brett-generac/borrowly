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

  render() {
    return (
      <div className="container">
        {this.state.loaded && (
          <>
            <List items={this.state.things} />
            <Map center={this.props.coordinates} />
          </>
        )}
      </div>
    );
  }
}

export default ListThings;
