import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import MovieModal from "./Components/MovieModal";
import MovieCard from "./Components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [sortAscending, setSortAscending] = useState(true);

  // Fetch movies from API
  const fetchMovies = async () => {
    const apikey = import.meta.env.VITE_API_KEY;
    const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${page}`;
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${searchInput}`;

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      console.log("Ran into an error: ", error);
    }
  };

  const searchMovies = async () => {
    console.log(movies);
    const apikey = import.meta.env.VITE_API_KEY;
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${searchInput}`;

    try {
      const response = await fetch(searchURL, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data.results);
      setFilteredMovies(data.results || []);
    } catch (error) {
      console.log("Ran into an error: ", error);
    }
  };

  const fetchGenres = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=28`;

    try {
      const response = await fetch(searchURL, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data.results);
      setFilteredMovies(data.results || []);
    } catch (error) {
      console.log("Ran into an error: ", error);
    }
  };

  // A hook used to call fetchMovies when "page" changes
  useEffect(() => {
    fetchMovies();
  }, [page]);

  // Function to load more movies
  const loadMore = () => {
    setPage((prevPage) => (prevPage += 1));
  };

  // Handler for search inputs
  const searchMoviesHandler = (event) => {
    event.preventDefault();
    // const search = event.target[0].value.toLowerCase();
    // setSearchInput(search);
    searchMovies();
  };

  // Sort the movies by the ratings
  const sortMoviesByRating = () => {
    const sortedMovies = [...movies];

    if (sortAscending) {
      setMovies(
        sortedMovies.sort((curr, next) => curr.vote_average - next.vote_average)
      );
    } else {
      setMovies(
        sortedMovies.sort((curr, next) => next.vote_average - curr.vote_average)
      );
    }

    console.log("Sorted movies: ", sortedMovies);
    //setFilteredMovies(filteredMovies);
    setSortAscending(!sortAscending);
  };

  // Sort the movies by the release date
  const sortMoviesByRelease = () => {
    const sortedMovies = [...movies];

    if (sortAscending) {
      sortedMovies.sort(
        (curr, next) =>
          new Date(curr.release_date) - new Date(next.release_date)
      );
    } else {
      sortedMovies.sort(
        (curr, next) =>
          new Date(next.release_date) - new Date(curr.release_date)
      );
    }

    console.log("Release sorted: ", sortedMovies);
    setMovies(sortedMovies);
    setFilteredMovies(sortedMovies);
    setSortAscending(!sortAscending);
  };

  return (
    <div className="App">
      {openModal && (
        <MovieModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          movie={movie}
        />
      )}
      <form onSubmit={searchMoviesHandler}>
        <input
          type="search"
          placeholder="Search Movies"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
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
        <button onClick={sortMoviesByRating}>Sort By Rating</button>
        <button onClick={sortMoviesByRelease}>Sort By Release Date</button>
      </form>
      <MovieList
        movies={filteredMovies ? filteredMovies : movies}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setMovie={setMovie}
      />
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}

export default App;
