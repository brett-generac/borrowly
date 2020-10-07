import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/SingleThingView.css";
import Map from "../../components/Map";
import { deleteThing, loadThing } from "../../services/thing";
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

  handleDeleteSubmit = (event) => {
    event.preventDefault();
    const body = {
      id: this.state.thing._id
    };
    deleteThing(body)
      .then(() => {
        this.props.history.push("/things/list");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleBorrowSubmit = (event) => {
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
    const { user } = this.props;
    let owner = false;
    if (thing && user && thing.owner._id === user._id) {
      owner = true;
    }
    return (
      <main>
        {(this.state.loaded && (
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
                    {owner && (
                      <form onSubmit={this.handleDeleteSubmit}>
                        <button id="delete-button" className="btn btn-danger">
                          Delete Thing
                        </button>
                        <Link className="btn btn-warning" to={`/things/${thing._id}/edit`}>
                          Edit Thing
                        </Link>
                      </form>
                    )}
                    {!owner && user && (
                      <form onSubmit={this.handleBorrowSubmit}>
                        <button className="btn btn-info">Ask to Borrow</button>
                      </form>
                    )}
                    {!user && <p className="card-text">Sign-in to borrow this thing</p>}
                  </div>
                </div>
              </section>
            </div>
            <Map center={thing.location.coordinates} marker={thing} />
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

export default SingleThingView;
