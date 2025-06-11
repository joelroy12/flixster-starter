import React, { useEffect } from "react";
import "./MovieModal.css";

const MovieModal = ({ setOpenModal, title, poster_path, release_date, overview, genre, video }) => {

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  });

  return (
    <div className="outer-shadow">
      <div className="modal">
        <h2>{title}</h2>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}></img>
        <p>{release_date}</p>
        <p>{overview}</p>
        <p>{genre}</p>
        <video>{video}</video>
        <button className="close" onClick={() => setOpenModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
