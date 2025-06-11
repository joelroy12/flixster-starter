import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import MovieList from "./Components/MovieList";
import MovieModal from "./Components/MovieModal";

function App() {
  const [movies, setMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // Fetch movies from API
  const fetchMovies = async () => {
    const apikey = import.meta.env.VITE_API_KEY;
    const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${page}`;

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
    const search = event.target.value.toLowerCase();
    setSearchInput(search);
  };

  // Then filter it based on inputs
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  // Needed to render the movies
  const renderMovies = () => {
    console.log("hello");
    if (showMovies) return <MovieList movies={filteredMovies} />;
    else return null;
  };

  return (
    <div className="App">
      {openModal && (
        <MovieModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <input
        type="search"
        placeholder="Search Movies"
        onChange={searchMoviesHandler}
      />
      <MovieList
        movies={movies}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}

export default App;
