import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Input from "./common/input";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [{}],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
    searchString: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "0815", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({
      moviesDB: movies,
      movies,
      genres,
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const idx = movies.indexOf(movie);
    movies[idx].liked = !movies[idx].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre.name, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    let {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
    } = this.state;

    const filteredMovies =
      currentGenre === "All Genres"
        ? allMovies
        : allMovies.filter((movie) => {
            return movie.genre.name === currentGenre;
          });

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  handleSearch = ({ currentTarget: input }) => {
    let { moviesDB: allMovies } = this.state;
    const searchString = input.value;
    const currentGenre = "All Genres";

    this.setState({ searchString });
    if (this.state.searchString !== "") this.setState({ currentGenre });

    let search = new RegExp(searchString, "i");
    const movies = allMovies.filter((movie) => {
      return movie.title.search(search) !== -1;
    });
    console.log("search: ", movies);
    if (movies.length !== 0) this.setState({ movies });
  };

  render() {
    console.log("startRender");

    let {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      currentGenre,
      sortColumn,
    } = this.state;

    const { user } = this.props;

    const count = this.getMovieCount(allMovies, currentGenre);
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();
    console.log("movies/render: ", movies);
    return (
      <div className="row">
        <div className="col col-3">
          <ListGroup
            items={genres}
            changedItem={currentGenre}
            onItemChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-3">
              New Movie
            </Link>
          )}
          <span className="m-3">
            Showing {totalCount} movies in the database.
          </span>
          <Input onChange={this.handleSearch} placeholder="Search..." />
          {totalCount > 0 && (
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
          )}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return (classes += this.state.count === 0 ? "warning" : "primary");
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }

  getMovieCount = (allMovies, currentGenre) => {
    const filteredMovies =
      currentGenre === "All Genres"
        ? allMovies
        : allMovies.filter((movie) => {
            return movie.genre.name === currentGenre;
          });
    return filteredMovies.length;
  };
}

export default Movies;
