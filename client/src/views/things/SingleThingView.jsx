import React, { Component } from "react";
import "../../styles/SingleThingView.css";
import Map from "../../components/Map";
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
      <main>
        {this.state.loaded && (
          <div>
            <div className="left">
              <section id="single">
                <div id="single" className="card">
                  <img id="img" src={thing.photoUrl} className="card-img-top" alt={thing.name} />
                  <div className="card-body">
                    <h5 className="card-title">
                      {thing.name} for borrow from {thing.owner.name}
                    </h5>
                    <p className="card-text">{thing.description}</p>
                    <form onSubmit={this.handleFormSubmit}>
                      <button className="btn btn-info">Ask to Borrow</button>
                    </form>
                  </div>
                </div>
              </section>
            </div>
            <Map center={thing.location.coordinates} marker={thing} />
          </div>
        )}
      </main>
    );
  }
}

export default SingleThingView;
