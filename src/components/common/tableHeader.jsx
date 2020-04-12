import React, { Component } from "react";

class Tableheader extends Component {
  raiseSort = (item) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === item.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = item;
      sortColumn.order = "asc";
    }
    this.props.onSortChange(sortColumn);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.data.map((item) => {
            return (
              <th
                key={item.path}
                onClick={() => {
                  this.raiseSort(item);
                }}
              >
                {item.label}
                {this.props.onIcon(item)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default Tableheader;
