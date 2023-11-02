
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import Detalhes from './filme/detalhes';

function Roteamento() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/detalhes/:movieId" component={Detalhes} /> 
      </Switch>
    </Router>
  );
}

export default Roteamento;
