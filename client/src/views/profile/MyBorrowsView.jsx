import React, { Component } from "react";
import "../CenterView.css";
import BorrowsList from "../../components/Lists/BorrowsList";
import ErrorMessage from "../../components/ErrorMessage";
import { loadMyBorrows } from "../../services/borrow";
import { approveBorrow } from "../../services/borrow";
import { endBorrow } from "../../services/borrow";

//edge case, when borrow is ended and there is other lends in the lend list
//the other lends get removed from list too, reappear once page is refreshed

//other edge case, a user deletes a thing that has a borrow requested, and
//the route tries to populate thing but it cannot, history view probably has same issue.

class MyBorrowsView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      borrows: [],
      lends: [],
      error: null
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

  handleApproveSubmit = async (event, id) => {
    event.preventDefault();
    const lends = [...this.state.lends];
    const index = lends.findIndex((lend) => lend._id === id);
    const lend = lends[index];
    const body = { lend };
    try {
      const data = await approveBorrow(body);
      if (!data) throw new Error("Unable to approve borrow");
      const { updatedLend } = data;
      lends[index] = updatedLend;
      this.props.handleUserUpdate(updatedLend.lender);
      this.setState({ lends });
    } catch (error) {
      this.setState({ error });
    }
  };

  handleEndSubmit = async (event, id) => {
    event.preventDefault();
    const body = { id };
    try {
      const data = await endBorrow(body);
      if (!data) throw new Error("Unable to end borrow");
      const lends = [...this.state.lends];
      const index = lends.findIndex((element) => element._id === data.lend._id);
      lends.splice(index, 1);
      this.setState({ lends });
    } catch (error) {
      this.setState({ error });
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  render() {
    let lendThings = 0;
    let borrowThings = 0;
    if (this.state.loaded) {
      lendThings = this.state.lends.length === 1 ? "thing" : "things";
      borrowThings = this.state.borrows.length === 1 ? "thing" : "things";
    }
    return (
      <main>
        <div className="container view-wrapper">
          <div className="row">
            {(this.state.loaded && (
              <div className="col">
                <h1>
                  Howdy, <span className="orange">{this.props.user.name}</span>.
                </h1>
                <h5>
                  You're lending {this.state.lends.length} <span className="orange">{lendThings}</span> and borrowing{" "}
                  {this.state.borrows.length} <span className="orange">{borrowThings}</span>.
                </h5>
                <hr className="thick" />
                <BorrowsList
                  borrows={this.state.borrows}
                  lends={this.state.lends}
                  handleApproveSubmit={this.handleApproveSubmit}
                  handleEndSubmit={this.handleEndSubmit}
                />
              </div>
            )) || (
              <div className="col">
                <div className="loading">
                  <h3>Loading...</h3>
                </div>
              </div>
            )}
          </div>
        </div>
        {this.state.error && (
          <ErrorMessage
            classToAdd="error-center"
            message={this.state.error.message}
            handleClearError={this.handleClearError}
          />
        )}
      </main>
    );
  }
}
export default MyBorrowsView;
