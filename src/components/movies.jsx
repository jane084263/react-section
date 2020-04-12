import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/pagination";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [],
    selectedGenre: [],
    pagination: {
      pageSize: 3,
      pageIndex: 1,
    },
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    let genres = [{ _id: "", name: "AllGenres" }, ...getGenres()];
    this.setState({ genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelected = (item) => {
    this.setState({
      selectedGenre: item,
      pagination: {
        pageSize: 3,
        pageIndex: 1,
      },
    });
  };
  handlePageChange = (page) => {
    let pagination = { ...this.state.pagination };
    pagination.pageIndex = page;
    this.setState({ pagination });
  };

  handleSortChange = (sortItem) => {
    this.setState({ sortColumn: sortItem });
  };
  getPagedData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      pagination,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    console.log(sortColumn.path, sortColumn.order);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    console.log("sorted", sorted);
    const pagenated = paginate(
      sorted,
      pagination.pageIndex,
      pagination.pageSize
    );
    return { data: pagenated, count: filtered.length };
  };

  render() {
    const { data: movies, count } = this.getPagedData();
    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedGenre={this.state.selectedGenre}
              onClick={this.handleGenreSelected}
            />
          </div>
          <div className="col-9">
            {/* <p>Showing {count} movies in the database.</p> */}
            <MoviesTable
              movies={movies}
              handleSortChange={this.handleSortChange}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              count={count}
              pagination={this.state.pagination}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
