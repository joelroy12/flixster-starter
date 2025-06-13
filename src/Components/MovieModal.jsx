import React, { useEffect, useState } from "react";
import "./MovieModal.css";

const MovieModal = ({ movie, openModal, setOpenModal }) => {
  const [videos, setVideos] = useState([]);
  const [genres, setGenres] = useState([]);
  const [runtime, setRuntime] = useState(null);

  console.log(movie);

  const fetchGenresAndRuntime = async () => {
    const apikey = import.meta.env.VITE_API_KEY;
    const genreAndRunTimeURL = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apikey}`;

    try {
      const response = await fetch(genreAndRunTimeURL, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data.results);
      return { genres: data.genres || [], runtime: data.runtime || null };
    } catch (error) {
      console.log("Ran into an error: ", error);
    }
  };

  useEffect(() => {
    if (!movie.id) return;
    const apikey = import.meta.env.VITE_API_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US&api_key=${apikey}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.results || []);
      })
      .catch((err) => console.error(err));

    fetchGenresAndRuntime().then(({ genres, runtime }) => {
      setGenres(genres);
      setRuntime(runtime);
    });
  }, [movie.id]);

  // While going through the videos, if the video is a trailer and is from YouTube then it sets video to the video that we .find
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="outer-shadow">
      <div className="modal">
        <h2>Title: {movie.title}</h2>
        <img
          className="modal-poster"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
        <p>Release Date: {movie.release_date}</p>
        <p>Overview: {movie.overview}</p>
        <p>Genre: {genres.map((event) => event.name).join(", ")}</p>
        <p>Runtime: {runtime ? `${runtime} mins` : "N/A"}</p>
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
