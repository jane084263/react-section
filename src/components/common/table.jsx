import React, { Component } from "react";
import Tableheader from "./tableHeader";
import Tablebody from "./tableBody";

class Table extends Component {
  render() {
    let props = this.props;
    return (
      <table className="table">
        <Tableheader
          data={props.theadData}
          onSortChange={props.onSortChange}
          onIcon={props.onIcon}
        />
        <Tablebody
          column={props.theadData}
          data={props.movies}
          onDelete={props.onDelete}
          onLike={props.onLike}
        />
      </table>
    );
  }
}

export default Table;
