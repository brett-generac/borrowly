import React from "react";
import { Link } from "react-router-dom";
import "./List.css";

const ThingList = (props) => {
  return (
    <div>
      {(props.things.length && (
        <>
          <h3>
            Your <span className="orange">Things</span>
          </h3>
          <ul>
            {props.things.map((thing) => (
              <li key={thing._id}>
                <hr />
                <div className="card">
                  <Link to={`/things/${thing._id}`}>
                    <img src={thing.photoUrl} className="card-img-top" alt={thing.name} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{thing.name}</h5>
                    <form onSubmit={props.handleDeleteForm}>
                      <button className="btn btn-danger">Delete Thing</button>
                      <Link className="btn btn-warning" to={`/things/${thing._id}/edit`}>
                        Edit Thing
                      </Link>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )) || (
        <div className="no-data">
          <h3>
            You don't have any <span className="orange">things</span>
          </h3>
          <h3>
            <Link to="/things/create">Contribute</Link> something to change that!
          </h3>
        </div>
      )}
    </div>
  );
};

export default ThingList;
