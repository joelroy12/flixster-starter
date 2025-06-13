import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList({
  movies,
  openModal,
  setOpenModal,
  setMovie,
  favorites,
  toggleFavorite,
  watched,
  toggleWatched,
}) {
  console.log(movies);

  if (!movies || movies.length === 0) {
    return <p>NO MOVIES FOUND</p>;
  }
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          openModal={openModal}
          setOpenModal={setOpenModal}
          setMovie={setMovie}
          key={`${movie.id}`}
          movie={movie}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          watched={watched}
          toggleWatched={toggleWatched}
        />
      ))}
    </div>
  );
}

export default MovieList;
