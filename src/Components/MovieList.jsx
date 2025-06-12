import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList({ movies, openModal, setOpenModal, setMovie }) {
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
        />
      ))}
    </div>
  );
}

export default MovieList;
