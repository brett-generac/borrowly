import React, { Component } from "react";
import "../MapView.css";
import Map from "../../components/Map/Map";
import SearchList from "../../components/Lists/SearchList";
import { loadThings } from "../../services/thing";

//app gets user coordinates/location when mounted but if you type things/list
// and don't use btn to get here, server crashes

export class SearchThings extends Component {
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
      <main className="map-main">
        {(this.state.loaded && (
          <div className="map-view">
            <div className="left">
              <SearchList
                user={this.props.user}
                category={this.props.category}
                location={this.props.location}
                things={this.state.things}
              />
            </div>
          </div>
        )) || (
          <div>
            <div className="left">
              <h3 className="loading">Loading...</h3>
            </div>
            <div className="map-loading"></div>
          </div>
        )}
        <Map view="search" center={this.props.coordinates} markers={this.state.things} />
      </main>
    );
  }
}

export default SearchThings;
