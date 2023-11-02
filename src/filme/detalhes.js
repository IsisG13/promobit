import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import BarraLogo from "./barraLogo";
import "../App.css";

function Detalhes() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const [genres, setGenres] = useState([]);
  const [elenco, setElenco] = useState([]);
  const [trailerInfo, setTrailerInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`, {
        params: {
          api_key: "40ae060748d346a47b5c16bf579a6764",
        },
      })
      .then((response) => {
        console.log(response);
        setMovieDetails(response.data);
        setGenres(response.data.genres);
        // Chame a função updateProgressBar após a atualização dos detalhes do filme
        updateProgressBar();
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
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        params: {
          api_key: "40ae060748d346a47b5c16bf579a6764",
        },
      })
      .then((response) => {
        setTrailerInfo(response.data.results);
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

  useEffect(() => {
    // Não é necessário chamar updateProgressBar aqui, pois já foi chamado na primeira useEffect.
  }, [movieDetails]); // Adicione movieDetails como uma dependência se necessário.

  function updateProgressBar() {
    console.log("!");
    const circle = document.querySelector("#circleProgress");
    console.log(circle);
    const number = document.querySelector("#numberProgress");
    console.log(number);
    number.textContent = `${Math.round(movieDetails.vote_average * 10)}%`;
    console.log(movieDetails.vote_average);
    return (circle.style.strokeDashoffset =
      251 - 2.51 * (movieDetails.vote_average * 10));
  }

  return (
    <div className="App">
      <BarraLogo />
      <div className="imagemDetalhes">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          onClick={updateProgressBar}
        />

        <div className="cabecalhoDescricao">
          <div className="header-info">
            <h3>{movieDetails.title}</h3>
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

          <div className="box">
            <div className="box-circle">
              <svg>
                <circle cx="40" cy="40" r="40"></circle>
                <circle id="circleProgress" cx="40" cy="40" r="40"></circle>
              </svg>
            </div>
            <div className="number">
            <h5 id="numberProgress">{movieDetails.vote_average ? movieDetails.vote_average * 10 : 0}%</h5>
            </div>
          </div>

          <h4>Sinopse</h4>
          <p>
            {movieDetails.overview
              ? movieDetails.overview
              : "A sinopse não está disponivel em portugues"}
          </p>
        </div>
      </div>
      <div className="conteudoDetalhes">
        <h2>Elenco Oficial</h2>
        <div className="container-elenco">
        {elenco.map((actor) => (
          <div key={actor.id}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <img
                src="/caminho_para_imagem_padrao.png" // Substitua pelo caminho da imagem padrão
                alt={actor.name}
              />
            )}
            <h4>{actor.name}</h4>
            <p>{actor.character}</p>
          </div>
        ))}
        </div>

        <div className="trailer">
          <h2>Trailer</h2>
          {trailerInfo && trailerInfo.length > 0 && (
            <iframe
              title="Trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerInfo[0].key}`}
              allowFullScreen
            />
          )}
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
                <h5>{movie.title}</h5>
                <p>{format(new Date(movie.release_date), "d MMM yyyy")}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
