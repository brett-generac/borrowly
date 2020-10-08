import React, { Component } from "react";
import HistoryList from "../../components/HistoryList";
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
        <div className="container view-wrapper">
          <div className="row">
            {(this.state.loaded && (
              <div className="col">
                <h1>
                  Howdy, <span className="orange">{this.props.user.name}</span>.
                </h1>
                <h5>
                  You lended {this.state.lends.length} <span className="orange">{lendThings}</span> and borrowed{" "}
                  {this.state.borrows.length} <span className="orange">{borrowThings}</span>.
                </h5>
                <hr className="thick" />
                <HistoryList borrows={this.state.borrows} lends={this.state.lends} />
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
      </main>
    );
  }
}
export default MyHistoryView;
