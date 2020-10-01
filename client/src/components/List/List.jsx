import React from "react";
import "./List.css";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <ul>
      {props.things &&
        props.things.map((thing) => (
          <li key={thing._id}>
            <Link to={`/things/${thing._id}`}>
              <div className="card">
                <img src={thing.photoUrl} className="card-img-top" alt={thing.name} />
                <div className="card-body">
                  <h5 className="card-title">{thing.name}</h5>
                  <p className="card-text">{thing.description}</p>
                </div>
              </div>
            </Link>
            <hr />
          </li>
        ))}
      {props.borrows &&
        props.borrows.map((borrow) => (
          <li key={borrow._id}>
            <div className="card">
              <img src={borrow.thing.photoUrl} className="card-img-top" alt={borrow.thing.name} />
              <div className="card-body">
                <h5 className="card-title">{borrow.thing.name}</h5>
                {(borrow.active && <p className="card-text">Borrowing from {borrow.lender.name}</p>) || (
                  <p className="card-text">Pending approval from {borrow.lender.name}</p>
                )}
              </div>
            </div>
            <hr />
          </li>
        ))}
      {props.lends &&
        props.lends.map((lend) => (
          <li key={lend._id}>
            <div className="card">
              <img src={lend.thing.photoUrl} className="card-img-top" alt={lend.thing.name} />
              <div className="card-body">
                <h5 className="card-title">{lend.thing.name}</h5>
                {(lend.active && (
                  <>
                    <p className="card-text">Lending to {lend.borrower.name}</p>
                    <form onSubmit={(event) => props.handleEndSubmit(event, lend._id)}>
                      <button className="btn btn-primary">End Borrow</button>
                    </form>
                  </>
                )) || (
                  <>
                    <p className="card-text">Pending your approval</p>
                    <form onSubmit={(event) => props.handleApproveSubmit(event, lend._id)}>
                      <button className="btn btn-primary">Approve Borrow</button>
                    </form>
                  </>
                )}
              </div>
            </div>
            <hr />
          </li>
        ))}
    </ul>
  );
};

export default List;
