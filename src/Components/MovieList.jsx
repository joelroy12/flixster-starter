import MovieCard from "./MovieCard";
import './MovieList.css';

function MovieList({ movies, openModal, setOpenModal }) {
  if (!movies || movies.length === 0) {
    return <p>NO MOVIES FOUND</p>
  }
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard openModal={openModal} setOpenModal={setOpenModal} key={`${movie.id}`} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
