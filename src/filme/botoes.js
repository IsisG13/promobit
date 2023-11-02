import React from "react";

function Botoes() {
    const acao = () => {}
    const aventura = () => {}
    const animacao = () => {}
    const comedia = () => {}
    const crime = () => {}
    const documentario = () => {}
    const drama = () => {}
    const familia = () => {}
    const fantasia = () => {}
    const historia = () => {}
    const terror = () => {}
    const musica = () => {}
    const misterio = () => {}
    const romance = () => {}
    const ficccao = () => {}
    const cinema = () => {}
    const thiller = () => {}
    const guerra = () => {}
    const faroeste = () => {}


  return (
    <div className="botoes">
      <div className="button">
        <button onClick={acao}>Ação</button> <button onClick={aventura}>Aventura</button>{" "}
        <button onClick={animacao}>Animação</button> <button onClick={comedia}>Comédia</button>{" "}
        <button onClick={crime}>Crime</button> <button onClick={documentario}>Documentário</button>{" "}
        <button onClick={drama}>Drama</button> <button onClick={familia}>Família</button>{" "}
        <button onClick={fantasia}>Fantasia</button> <button onClick={historia}>História</button> <br />
        <button onClick={terror}>Terror</button> <button onClick={musica}>Música</button>{" "}
        <button onClick={misterio}>Mistério</button> <button onClick={romance}>Romance</button>{" "}
        <button onClick={ficccao}> Ficcção científica</button> <button onClick={cinema}>Cinema TV</button>{" "}
        <button onClick={thiller}>Thriller</button> <button onClick={guerra}>Guerra</button>{" "}
        <button onClick={faroeste}>Faroeste</button>
      </div>
    </div>
  );
}

export default Botoes;
