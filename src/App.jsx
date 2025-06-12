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
  const [sort, setSort] = useState("");

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
      console.log(data.results);
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.log("Ran into an error: ", error);
    }
  };

  const searchMovies = async () => {
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

  //  const fetchGenres = async () => {
  //   const apiKey = import.meta.env.VITE_API_KEY;
  //   const genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=28`;

  //   try {
  //     const response = await fetch(searchURL, {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //       },
  //     });

  // };

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

  // Then filter it based on inputs

  // const filteredLocalMovies = movies.filter((movie) => {
  //   return movie.title.toLowerCase().includes(searchInput.toLowerCase());
  // });

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
