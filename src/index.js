import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ScoreProvider } from "./context/ScoreContext";

ReactDOM.render(
  <React.StrictMode>
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
