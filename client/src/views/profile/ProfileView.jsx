import React, { Component } from "react";
import ProfileList from "../../components/ProfileList";
import { loadMyBorrows } from "../../services/borrow";
import { approveBorrow } from "../../services/borrow";
import { endBorrow } from "../../services/borrow";

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      borrows: [],
      lends: []
    };
  }

  componentDidMount() {
    loadMyBorrows().then((data) => {
      this.setState({
        loaded: true,
        borrows: data.borrows,
        lends: data.lends
      });
    });
  }

  handleApproveSubmit = (event, id) => {
    event.preventDefault();
    const body = {
      id
    };
    approveBorrow(body)
      .then((data) => {
        const { lend } = data;
        const user = data.lender;
        const lends = [...this.state.lends];
        const index = lends.findIndex((element) => element._id === lend._id);
        lends[index] = lend;
        this.props.handleUserUpdate(user);
        this.setState({
          lends
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleEndSubmit = (event, id) => {
    event.preventDefault();
    const body = {
      id
    };
    endBorrow(body)
      .then((data) => {
        const lends = [...this.state.lends];
        const index = lends.findIndex((element) => element._id === data.lend._id);
        lends.splice(index);
        this.setState({
          lends
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const favors = this.props.user.favors === 1 ? "favor" : "favors";
    return (
      <main>
        <div className="container">
          <div className="center">
            {(this.state.loaded && (
              <div className="view-wrapper">
                <h1>
                  Howdy, <span className="orange">{this.props.user.name}</span>.
                </h1>
                <h5>
                  You have <b>{this.props.user.favors}</b> <span className="orange">{favors}</span> left.
                </h5>
                <hr className="thick" />
                <ProfileList
                  borrows={this.state.borrows}
                  lends={this.state.lends}
                  handleApproveSubmit={this.handleApproveSubmit}
                  handleEndSubmit={this.handleEndSubmit}
                />
              </div>
            )) || (
              <div className="view-wrapper">
                <div className="loading">
                  <h3>Loading...</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}
export default ProfileView;
