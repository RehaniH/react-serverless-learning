import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import Home from "./pages/Home";
import HighScores from "./pages/HighScores";
import Navbar from "./components/Navbar";

import { Container } from "./styled/Container";
import { Main } from "./styled/Main";
import Global from "./styled/Global";
import { useAuth0 } from "@auth0/auth0-react";
// import "./App.css";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <Router>
      <Global />
      <Main>
        <Container>
          <Navbar />
          <Switch>
            <Route path="/game" component={Game} />
            <Route path="/highScores" component={HighScores} />
            <Route path="/gameOver" component={GameOver} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
