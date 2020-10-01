import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SingleThingView.css";
import Map from "../../components/Map/Map";
import { loadThing } from "../../services/thing";
import { createBorrow } from "../../services/borrow";

class SingleThingView extends Component {
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

  handleFormSubmit = (event) => {
    event.preventDefault();
    const body = {
      lender: this.state.thing.owner._id,
      thing: this.state.thing._id
    };
    createBorrow(body).then(() => {
      this.props.history.push("/profile");
    });
  };

  render() {
    const { thing } = this.state;
    return (
      <div className="main">
        <div className="container-side">
          {this.state.loaded && (
            <div className="side">
              <div className="card single">
                <img id="img" src={thing.photoUrl} className="card-img-top" alt={thing.name} />
                <div className="card-body">
                  <h5 className="card-title">{thing.name}</h5>
                  <p className="card-text">{thing.description}</p>
                  <p className="card-text">Being lended by {thing.owner.name}</p>
                  <form onSubmit={this.handleFormSubmit}>
                    <button className="btn btn-primary">Ask to Borrow</button>
                  </form>
                </div>
              </div>
              <Map center={thing.location.coordinates} marker={thing} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SingleThingView;
