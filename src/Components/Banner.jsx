import React from "react";
import "../Components/Banner.css";
import App from "../App";

const Banner = ({
  searchInput,
  setSearchInput,
  searchMoviesHandler,
  setFilteredMovies,
  sortMoviesByAlphabetical,
  sortMoviesByRating,
  sortMoviesByRelease,
}) => {
  return (
    <div className="Banner">
      <form className="top-banner" onSubmit={searchMoviesHandler}>
        <input
          type="search"
          placeholder="Search Movies"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="search-bar"
        />
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setSearchInput("");
            setFilteredMovies(null);
          }}>
          Clear
        </button>
        <select
          onChange={(event) => {
            const value = event.target.value;
            if (value === "alphabetical") {
              sortMoviesByAlphabetical();
            } else if (value === "vote") {
              sortMoviesByRating();
            } else if (value === "release") {
              sortMoviesByRelease();
            }
          }}>
          <option value="alphabetical" onClick={sortMoviesByAlphabetical}>
            Sort A-Z
          </option>
          <option value="vote" onClick={sortMoviesByRating}>
            Sort By Rating
          </option>
          <option value="release" onClick={sortMoviesByRelease}>
            Sort By Release Date
          </option>
        </select>
        <button type="button" className="sidebar">
          Sidebar
        </button>
      </form>
    </div>
  );
};

export default Banner;
