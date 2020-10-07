import React from "react";
import "../styles/List.css";
import { Link } from "react-router-dom";

const List = (props) => {
  const string = props.things.length === 1 ? "thing" : "things";
  const category = props.category ? `${props.category}` : "things";
  const capCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <div>
      {(props.things.length && (
        <>
          <span>
            {props.things.length} {string}
          </span>
          <h3>
            <span className="orange">{capCategory}</span> to borrow near {props.location}
          </h3>
          <hr className="thick" />
          <ul>
            {props.things.map((thing) => (
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
          </ul>
        </>
      )) || (
        <div className="no-data">
          <h3>
            There aren't any <span className="orange">{category}</span> to borrow near {props.location}
          </h3>
          {(props.user && (
            <h3>
              <Link to="/things/create">Contribute</Link> something to change that!
            </h3>
          )) || (
            <h3>
              <Link to="/auth/sign-in">Sign-In</Link>/<Link to="/auth/sign-up">Sign-Up</Link> to change that!
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
