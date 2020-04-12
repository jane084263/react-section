import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  colums = [
    {
      label: "title",
      path: "title",
      order: "asc",
    },
    {
      label: "genre",
      path: "genre.name",
      order: "asc",
    },
    {
      label: "stock",
      path: "numberInStock",
      order: "asc",
    },
    {
      label: "rate",
      path: "dailyRentalRate",
      order: "",
    },
    {
      label: "like",
      path: "like",
      order: "asc",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      label: "actions",
      path: "actions",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  raiseSortIcon = (item) => {
    if (item.path !== this.props.sortColumn.path) {
      return null;
    }
    return (
      <i
        className={
          item.order && item.order === "asc"
            ? "fa fa-sort-asc"
            : "fa fa-sort-desc"
        }
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <Table
          theadData={this.colums}
          movies={this.props.movies}
          onSortChange={this.props.handleSortChange}
          onIcon={this.raiseSortIcon}
          onLike={this.props.handleLike}
          onDelete={this.props.handleDelete}
          sortColumn={this.props.sortColumn}
        />
      </React.Fragment>
    );
  }
}

export default MoviesTable;
