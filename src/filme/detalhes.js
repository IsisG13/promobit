import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import BarraLogo from "./barraLogo";
import "../App.css";
// import { format } from "date-fns";

function Detalhes() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const [genres, setGenres] = useState([]);
  const [elenco, setElenco] = useState([]);
  const [trailerInfo, setTrailer] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, {
        params: {
          api_key: "40ae060748d346a47b5c16bf579a6764",
        },
      })
      .then((response) => {
        setMovieDetails(response.data);
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do filme:", error);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          api_key: "40ae060748d346a47b5c16bf579a6764",
        },
      })
      .then((response) => {
        setElenco(response.data.cast);
      })
      .catch((error) => {
        console.error("Erro ao buscar o elenco do filme:", error);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        params: {
          api_key: "40ae060748d346a47b5c16bf579a6764",
        },
      })
      .then((response) => {
        setTrailer(response.data.casts);
      })
      .catch((error) => {
        console.error("Erro ao buscar o trailer do filme:", error);
      });
  }, [movieId]);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
        params: {
          api_key: "40ae060748d346a47b5c16bf579a6764",
          language: "en-US",
          page: 1,
        },
      })
      .then((response) => {
        setMovies(response.data.results.slice(0, 6));
      })
      .catch((error) => {
        console.error("Erro ao buscar os filmes:", error);
      });
  }, []);

  return (
    <div className="App">
      <BarraLogo />
      <div className="imagemDetalhes">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />

        <div className="cabecalhoDescricao">
          <div className="header-info">
            <h3>
              {movieDetails.title}
              {/* {format(new Date(movieDetails.release_date), " dd/MM/yyyy")} */}
            </h3>
            {genres && (
              <div className="genre">
                {genres.map((genre, index) => (
                  <span key={genre.id}>
                    {genre.name}
                    {index !== genres.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}
            <p className="duracao">
              {Math.floor(movieDetails.runtime / 60)}h{" "}
              {movieDetails.runtime % 60}min •{" "}
            </p>
          </div>

          <p className="classificacao">
            <div className="circle-wrap">
              <div className="circle">
                <div className="mask full">
                  <div className="fill"></div>
                </div>

                <div className="mask half">
                  <div className="fill"></div>
                </div>

                <div className="inside-circle">
                  {Math.round(movieDetails.vote_average * 10)}%
                </div>
              </div>
            </div>
            <p className="avaliacao">Avaliação dos usuários</p>
          </p>

          <h4>Sinopse</h4>
          <p>{movieDetails.overview}</p>
        </div>
      </div>
      <div className="conteudoDetalhes">
        <h2>Elenco Oficial</h2>
        <div className="container-elenco">
          {elenco.map((actor) => (
            <div key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <h4>{actor.name}</h4>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>

        <div>
          <h2>Trailer</h2>

        </div>

        <h2>Recomendações</h2>
        <div className="recomendacoes-container">
          {movies.map((movie) => (
            <div className="recomendacoes" key={movie.id}>
              <Link to={`/detalhes/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <h5>{movie.title}</h5>
              <p>{format(new Date(movie.release_date), "d MMM yyyy")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
