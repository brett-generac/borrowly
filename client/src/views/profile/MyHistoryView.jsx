import React, { Component } from "react";
import List from "../../components/List";
//import { Link } from "react-router-dom";
import { loadMyHistory } from "../../services/borrow";

class MyHistoryView extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      borrows: null,
      lends: null
    };
  }

  componentDidMount() {
    loadMyHistory().then((data) => {
      this.setState({
        loaded: true,
        borrows: data.borrows,
        lends: data.lends
      });
    });
  }

  render() {
    let lendThings = 0;
    let borrowThings = 0;
    if (this.state.loaded) {
      lendThings = this.state.lends.length === 1 ? "thing" : "things";
      borrowThings = this.state.borrows.length === 1 ? "thing" : "things";
    }
    return (
      <main>
        <div className="container center">
          {this.state.loaded && (
            <div className="wrapper">
              <h3>
                Howdy, <span className="orange">{this.props.user.name}</span>.
              </h3>
              <p>
                You have lended {this.state.lends.length} {lendThings} and borrowed {this.state.borrows.length}{" "}
                {borrowThings}.
              </p>
              <h3>Things you borrowed</h3>
              <List borrows={this.state.borrows} />
              <h3>Things you lended</h3>
              <List lends={this.state.lends} />
            </div>
          )}
        </div>
      </main>
    );
  }
}
export default MyHistoryView;
