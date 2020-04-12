import React from "react";
const ListGroup = (props) => {
  return (
    <ul className="list-group">
      {props.items.map((item) => {
        return (
          <li
            className={
              props.selectedGenre == item
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item._id}
            onClick={() => {
              props.onClick(item);
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
