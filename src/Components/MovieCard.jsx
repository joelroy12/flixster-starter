import "../Components/Card.css";
import "./MovieCard.css";

function MovieCard({
  movie,
  openModal,
  setOpenModal,
  setMovie,
  favorites,
  toggleFavorite,
  watched,
  toggleWatched,
}) {
  const { title, poster_path, vote_average, id } = movie;

  // Heart function
  let heartClass = "blank-heart";
  let heartIcon = "🤍";

  if (favorites.includes(id)) {
    heartClass = "red-heart";
    heartIcon = "❤️";
  }

  // Watched function
  let watching = "eye-button";
  let eyes = "👀";

  if (watched.includes(id)) {
    watching = "sunglasses-button";
    eyes = "😎";
  }
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
      <h2 className="title">{title}</h2>
      <p className="rating-text">Rating: {vote_average.toFixed(2)}/10</p>
      <div>
        <button
          className={heartClass}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(id);
          }}>
          {heartIcon}
        </button>
        <button
          className={watching}
          onClick={(event) => {
            event.stopPropagation();
            toggleWatched(id);
          }}>
          {eyes}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
