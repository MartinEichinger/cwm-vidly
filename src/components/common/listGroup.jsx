import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemChange,
  changedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            key={item[valueProperty]}
            className={
              changedItem === item.name
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemChange(item)}
            style={{ cursor: "pointer" }}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
