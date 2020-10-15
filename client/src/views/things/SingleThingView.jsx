import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../MapView.css";
import Map from "../../components/Map/Map";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteThing, loadThing } from "../../services/thing";
import { createBorrow } from "../../services/borrow";

class SingleThingView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      thing: null,
      error: null
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

  handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const body = {
      id: this.state.thing._id
    };
    try {
      const data = await deleteThing(body);
      if (!data.deleted) throw new Error("Unable to delete that thing");
      this.props.history.push("/profile/things");
    } catch (error) {
      this.setState({ error });
    }
  };

  handleAskSubmit = async (event) => {
    event.preventDefault();
    const body = {
      lender: this.state.thing.owner._id,
      thing: this.state.thing
    };
    try {
      if (this.props.user.favors < 1) throw new Error("You need a favor in order to borrow things");
      const data = await createBorrow(body);
      if (!data.created) throw new Error("Unable to ask to borrow");
      this.props.history.push("/profile");
    } catch (error) {
      this.setState({ error });
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
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
              <div id="single" className="card">
                <img id="img" src={thing.photoUrl} className="card-img-top" alt={thing.name} />
                <div className="card-body">
                  <h5 className="card-title">
                    {thing.name} for borrow from {thing.owner.name}
                  </h5>
                  <p className="card-text">{thing.description}</p>
                  {owner && (
                    <form onSubmit={this.handleDeleteSubmit}>
                      <button className="btn btn-danger">Delete Thing</button>
                      <Link className="btn btn-warning" to={`/things/${thing._id}/edit`}>
                        Edit Thing
                      </Link>
                    </form>
                  )}
                  {!owner && user && (
                    <form onSubmit={this.handleAskSubmit}>
                      <button className="btn btn-info">Ask to Borrow</button>
                    </form>
                  )}
                  {!user && <p className="card-text">Sign-in to borrow this thing</p>}
                </div>
              </div>
            </div>
            {this.state.error && (
              <ErrorMessage
                classToAdd="error-side"
                message={this.state.error.message}
                handleClearError={this.handleClearError}
              />
            )}
            <Map view="single" center={thing.location.coordinates} marker={thing} />
          </div>
        )) || (
          <div>
            <div className="left">
              <h3 className="loading">Loading...</h3>
            </div>
            <div className="map-loading" />
          </div>
        )}
      </main>
    );
  }
}

export default SingleThingView;
