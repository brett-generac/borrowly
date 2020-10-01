import React, { Component } from "react";
import List from "../../components/List/List";
//import { Link } from "react-router-dom";
import { loadMyBorrows } from "../../services/borrow";
import { approveBorrow } from "../../services/borrow";
import { endBorrow } from "../../services/borrow";

class ProfileView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      //things: null,
      borrows: null,
      lends: null
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
    approveBorrow(body).then((data) => {
      const { lend } = data;
      const lends = [...this.state.lends];
      const index = lends.findIndex((element) => element._id === lend._id);
      lends[index] = lend;
      this.setState({
        lends
      });
    });
  };

  handleEndSubmit = (event, id) => {
    event.preventDefault();
    const body = {
      id
    };
    endBorrow(body).then((data) => {
      const lends = [...this.state.lends];
      const index = lends.findIndex((element) => element._id === data.lend._id);
      lends.splice(index);
      this.setState({
        lends
      });
    });
  };

  render() {
    const favors = this.props.user.favors === 1 ? "favor" : "favors";
    return (
      <div className="main">
        <div className="container-center">
          {this.state.loaded && (
            <div className="center">
              <h3>Howdy, {this.props.user.name}.</h3>
              <p>
                You have {this.props.user.favors} {favors} left.
              </p>
              <h3>Things you're borrowing</h3>
              <List borrows={this.state.borrows} />
              <h3>Things you're lending</h3>
              <List
                lends={this.state.lends}
                handleApproveSubmit={this.handleApproveSubmit}
                handleEndSubmit={this.handleEndSubmit}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ProfileView;
