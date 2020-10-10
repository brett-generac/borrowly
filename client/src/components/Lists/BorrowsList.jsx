import React from "react";
import "./List.css";
import { Link } from "react-router-dom";

const BorrowsList = (props) => {
  return (
    <div>
      {(props.borrows.length && (
        <>
          <h3>
            <span className="orange">Things</span> you're borrowing
          </h3>
          <ul>
            {props.borrows.map((borrow) => (
              <li key={borrow._id}>
                <hr />
                <div className="card">
                  <img src={borrow.thing.photoUrl} className="card-img-top" alt={borrow.thing.name} />
                  <div className="card-body">
                    <h5 className="card-title">{borrow.thing.name}</h5>
                    {(borrow.active && <p className="card-text">Borrowing from {borrow.lender.name}</p>) || (
                      <p className="card-text">Pending approval from {borrow.lender.name}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )) || (
        <div className="no-data">
          <h3>You aren't borrowing anything</h3>
          <h3>
            <Link to="/">Discover</Link> what there is to borrow
          </h3>
        </div>
      )}
      <hr className="thick" />
      {(props.lends.length && (
        <>
          <h3>
            <span className="orange">Things</span> you're lending
          </h3>
          <ul>
            {props.lends.map((lend) => (
              <>
                <hr />
                <li key={lend._id}>
                  <div className="card">
                    <img src={lend.thing.photoUrl} className="card-img-top" alt={lend.thing.name} />
                    <div className="card-body">
                      <h5 className="card-title">{lend.thing.name}</h5>
                      {(lend.active && (
                        <>
                          <p className="card-text">End the borrow once {lend.borrower.name} returns the thing</p>
                          <form onSubmit={(event) => props.handleEndSubmit(event, lend._id)}>
                            <button className="btn btn-warning">End Borrow</button>
                          </form>
                        </>
                      )) || (
                        <>
                          <p className="card-text">Pending your approval to {lend.borrower.name}</p>
                          <form onSubmit={(event) => props.handleApproveSubmit(event, lend._id)}>
                            <button className="btn btn-primary">Approve Borrow</button>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </>
      )) || (
        <div className="no-data">
          <h3>You aren't lending anything</h3>
        </div>
      )}
    </div>
  );
};

export default BorrowsList;
