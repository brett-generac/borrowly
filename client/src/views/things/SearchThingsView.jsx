import React, { Component } from "react";
import Map from "../../components/Map";
import SearchList from "../../components/SearchList";
import { loadThings } from "../../services/thing";

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
      <main>
        {(this.state.loaded && (
          <div>
            <div className="left">
              <SearchList
                user={this.props.user}
                category={this.props.category}
                location={this.props.location}
                things={this.state.things}
              />
            </div>
            <Map view="search" center={this.props.coordinates} markers={this.state.things} />
          </div>
        )) || (
          <div>
            <div className="left">
              <h3 className="loading">Loading...</h3>
            </div>
            <div className="map-loading"></div>
          </div>
        )}
      </main>
    );
  }
}

export default SearchThings;
