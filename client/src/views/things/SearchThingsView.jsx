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
              <section>
                <SearchList
                  user={this.props.user}
                  category={this.props.category}
                  location={this.props.location}
                  things={this.state.things}
                />
              </section>
            </div>
            <Map center={this.props.coordinates} markers={this.state.things} />
          </div>
        )) || (
          <div className="view-wrapper">
            <div className="loading">
              <h3>Loading...</h3>
            </div>
          </div>
        )}
      </main>
    );
  }
}

export default SearchThings;
