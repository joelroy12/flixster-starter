import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import MovieModal from "./Components/MovieModal";
import MovieCard from "./Components/MovieCard";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [sortAscending, setSortAscending] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currPage, setCurrPage] = useState("Home");

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
      //console.log(data);
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
    //console.log(movies);
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
      //console.log(data.results);
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
    searchMovies();
  };

  const sortMoviesByAlphabetical = () => {
    const sortedMovies = [...movies];

    setMovies(
      sortedMovies.sort((curr, next) => curr.title.localeCompare(next.title))
    );
  };

  // Sort the movies by the ratings
  const sortMoviesByRating = () => {
    const sortedMovies = [...movies];
    setMovies(
      sortedMovies.sort((curr, next) => next.vote_average - curr.vote_average)
    );
  };

  // Sort the movies by the release date
  const sortMoviesByRelease = () => {
    const sortedMovies = [...movies];

    sortedMovies.sort(
      (curr, next) => new Date(next.release_date) - new Date(curr.release_date)
    );

    console.log("Release sorted: ", sortedMovies);
    setMovies(sortedMovies);
  };

  // User can favorite the movie
  const toggleFavorite = (movieID) => {
    if (favorites.includes(movieID)) {
      setFavorites(favorites.filter((id) => id !== movieID));
    } else {
      setFavorites([...favorites, movieID]);
    }
  };

  // User can mark it as a "watched" movie
  const toggleWatched = (movieID) => {
    if (watched.includes(movieID)) {
      setWatched(watched.filter((id) => id !== movieID));
    } else {
      setWatched([...watched, movieID]);
    }
  };

  let moviesShowing;
  if (currPage === "Home") {
    moviesShowing = filteredMovies || movies;
  } else if (currPage === "Favorites") {
    moviesShowing = movies.filter((movie) => favorites.includes(movie.id));
  } else if (currPage === "Watched") {
    moviesShowing = movies.filter((movie) => watched.includes(movie.id));
  }

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="App">
      <div className="top-section">
        <Header />
        <Banner
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchMoviesHandler={searchMoviesHandler}
          setFilteredMovies={setFilteredMovies}
          sortMoviesByAlphabetical={sortMoviesByAlphabetical}
          sortMoviesByRating={sortMoviesByRating}
          sortMoviesByRelease={sortMoviesByRelease}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        setPage={setCurrPage}
      />

      {openModal && (
        <MovieModal
          movie={movie}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}

      <MovieList
        movies={moviesShowing}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setMovie={setMovie}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        watched={watched}
        toggleWatched={toggleWatched}
      />
      <button className="load-more" onClick={loadMore}>
        Load More
      </button>
      <Footer />
    </div>
  );
}

export default App;
