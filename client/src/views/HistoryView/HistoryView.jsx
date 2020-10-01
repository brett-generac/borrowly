import React, { Component } from "react";
import List from "../../components/List/List";
//import { Link } from "react-router-dom";
import { loadBorrowHistory } from "../../services/borrow";

class HistoryView extends Component {
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
    loadBorrowHistory().then((data) => {
      this.setState({
        loaded: true,
        borrows: data.borrows,
        lends: data.lends
      });
    });
  }

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
              <h3>Things you borrowed</h3>
              <List borrows={this.state.borrows} />
              <h3>Things you lended</h3>
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
export default HistoryView;
