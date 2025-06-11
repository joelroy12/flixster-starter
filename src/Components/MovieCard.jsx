import "../Components/Card.css";
import "./MovieCard.css";

function MovieCard({ movie, openModal, setOpenModal }) {
  const { title, poster_path, vote_average } = movie;
  return (
    <div className="movie-card" onClick={() => setOpenModal(true)}>
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}></img>
      <h2>{title}</h2>
      <p>{vote_average}</p>
    </div>
  );
}

export default MovieCard;
