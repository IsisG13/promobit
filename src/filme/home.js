import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import BarraLogo from "./barraLogo";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenres, setActiveGenres] = useState({});

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
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar os filmes:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        params: {
          api_key: "40ae060748d346a47b5c16bf579a6764",
          language: 'pt-BR',
        },
      })
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do filme:", error);
      });
  }, []);

  function toggleGenreFilter(genreId) {
    setActiveGenres((prevGenres) => {
      return { ...prevGenres, [genreId]: !prevGenres[genreId] };
    });
  }

  function isMovieVisible(movie) {
    if (Object.values(activeGenres).every((active) => !active)) {
      return true;
    }

    for (const genreId in activeGenres) {
      if (activeGenres[genreId] && movie.genre_ids.includes(parseInt(genreId))) {
        return true;
      }
    }

    return false;
  }

  return (
    <div className="App">
      <div className="cabecalho">
        <BarraLogo />
        <div className="itens">
          <div className="titulo">
          <h2>
            Milhões de filmes, séries e pessoas para descobrir. Explore já.
          </h2>
          </div>
          <p>FILTRE POR: </p>
          <div className="button">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenreFilter(genre.id)}
                className={'botaoGenero '+ (activeGenres[genre.id] ? "active" : "")}
              >
                <span>{genre.name}</span>
                {activeGenres[genre.id] && (
                  <a className="limparId" onClick={() => toggleGenreFilter(genre.id)}>X</a>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filmes">
        {movies.map((movie) => (
          isMovieVisible(movie) && (
            <div key={movie.id}>
              <Link to={`/detalhes/${movie.id}`}>
                <div className="conteudo-filme">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              </Link>

              <div className="descricaoImagem">
              <h5 className="descricaoImagem">{movie.title}</h5>
              <p className="descricaoImagem">{format(new Date(movie.release_date), "d MMM yyyy")}</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Home;
