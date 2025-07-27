import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ScoreProvider } from "./context/ScoreContext";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-khldke6xv73n2jic.us.auth0.com"
      clientId="JA4wWjnHH5uUG3hdKvqQqUv59bmn9kNy"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://learn-build-type-xjb",
        scope: "read:current_user update:current_user_metadata",
      }}
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
