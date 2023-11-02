import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { format } from "date-fns";
import { Link } from "react-router-dom"; 
import BarraLogo from "./barraLogo";

function Home() {
  const [movies, setMovies] = useState([]);
  const [setGenres] = useState([]);

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
        },
      })
      .then((response) => {
        console.log(response.data)
        setGenres(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do filme:", error);
      });
  });

  return (
    <div className="App">
      <div className="cabecalho">
          <BarraLogo/>
        <div className="itens">
          <h2>
            Milhões de filmes, séries e pessoas para descobrir. <br /> Explore
            já.
          </h2>
          <p>FILTRE POR: </p>
          <div className="button">
          <button>Ação</button> <button>Aventura</button>{" "}
          <button>Animação</button> <button>Comédia</button>{" "}
          <button>Crime</button> <button>Documentário</button>{" "}
          <button>Drama</button> <button>Família</button>{" "}
          <button>Fantasia</button> <button>História</button> <br />
          <button>Terror</button> <button>Música</button>{" "}
          <button>Mistério</button> <button>Romance</button>{" "}
          <button> Ficcção científica</button> <button>Cinema TV</button>{" "}
          <button>Thriller</button> <button>Guerra</button>{" "}
          <button>Faroeste</button>
          </div>
        </div>
      </div>
      <div className="filmes">
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/detalhes/${movie.id}`}>
              <div className="conteudo-filme">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            </Link>

            <h5>{movie.title}</h5>
            <p>{format(new Date(movie.release_date), "d MMM yyyy")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
