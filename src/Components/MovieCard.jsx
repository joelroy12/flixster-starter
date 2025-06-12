import "../Components/Card.css";
import "./MovieCard.css";

function MovieCard({ movie, openModal, setOpenModal, setMovie }) {
  const { title, poster_path, vote_average } = movie;
//   console.log(movie);
  return (
    <div
      className="movie-card"
      onClick={() => {
        setOpenModal(true);
        setMovie(movie);
      }}>
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}></img>
      <h2>{title}</h2>
      <p>{vote_average.toFixed(2)}/10</p>
    </div>
  );
}

export default MovieCard;
