import React, { Component } from "react";
import List from "../../components/List";
import { loadMyThings } from "../../services/thing";

class MyThingsView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      things: null
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

  render() {
    return (
      <main>
        <div className="container">
          <div className="center">
            {this.state.loaded && (
              <div className="wrapper">
                <h3>
                  Howdy, <span className="orange">{this.props.user.name}</span>.
                </h3>
                <p>Thanks, for contributing to the community</p>
                <h3>Your things</h3>
                <List things={this.state.things} />
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}
export default MyThingsView;
