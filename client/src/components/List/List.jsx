import React from "react";

const List = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
