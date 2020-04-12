import React, { Component } from "react";
import _ from "lodash";
class Tablebody extends Component {
  renderCell = (col, item) => {
    if (col.content) return col.content(item);
    return _.get(item, col.path);
  };
  createKey = (col, item) => {
    return item._id + (col.path || col.key);
  };
  render() {
    return (
      <tbody>
        {this.props.data.map((movie) => (
          <tr key={movie._id}>
            {this.props.column.map((col) => {
              return (
                <td key={this.createKey(col, movie)}>
                  {this.renderCell(col, movie)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default Tablebody;
