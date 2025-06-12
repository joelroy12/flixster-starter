import React, { useEffect, useState } from "react";
import "./MovieModal.css";

const MovieModal = (movie) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    if (!movie.movie.id) return;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjMyZTczM2M4Zjg2ZjYxYTEwMGZmODQ4YzhlZGUzMiIsIm5iZiI6MTc0OTUwNDMzMi40MTQsInN1YiI6IjY4NDc1MTRjYTVmNmI1YzlhYjI5MzFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HSYe3uAfLYyTOOhpjNuLJo4euBpF4dQI1Br78ejiQbA",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movie.movie.id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.results || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // While going through the videos, if the video is a trailer and is from YouTube then it sets video to the video that we .find
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.getElementById("songs-list").innerHTML = "";
  });

  return (
    <div className="outer-shadow">
      <div className="modal">
        <h2>Title: {movie.movie.title}</h2>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/original/${movie.movie.poster_path}`}></img>
        <p>Release Date: {movie.movie.release_date}</p>
        <p>Overview: {movie.movie.overview}</p>
        <p>Genre: {movie.movie.genre_ids}</p>
        {trailer ? (
          <iframe
            className="trailer-box"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen></iframe>
        ) : (
          <p>No trailer available</p>
        )}

        <button className="close" onClick={() => setOpenModal(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
