import React, { Component } from "react";
import Map from "../../components/Map";
import List from "../../components/List";
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
    const category = this.props.category ? `${this.props.category}` : "things";
    const capCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return (
      <main>
        {this.state.loaded && (
          <div>
            <div className="left">
              <section>
                <p>{this.state.things.length} things</p>
                <h3>
                  {capCategory} to borrow near {this.props.location}
                </h3>
                <hr />
                <List things={this.state.things} />
              </section>
            </div>
            <Map center={this.props.coordinates} markers={this.state.things} />
          </div>
        )}
      </main>
    );
  }
}

export default ListThings;
