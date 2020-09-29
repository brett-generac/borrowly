import React from "react";
import "./List.css";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item._id}>
          <Link to={`/things/${item._id}`}>
            <div className="wrapper">
              <img src={item.photoUrl} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <small>{item.category}</small>
                <p>{item.description}</p>
              </div>
            </div>
          </Link>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default List;
