import "./App.css";

// Imports
import { Route, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { Container } from "semantic-ui-react";

// Components
import Home from "./Home";
import Messages from "./Messages";
import Profile from "./Profile";
import Navbar from "./Navbar";

// OIDC Config
import config from "./config";

const oktaAuth = new OktaAuth(config.oidc);

// Component
const App = () => {
  const history = useHistory();

  // History Hooks
  const restoreOriginalUri = async (oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  // UI
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Navbar />
      <Container text style={{ marginTop: "7em" }}>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login/callback" component={LoginCallback} />
        <SecureRoute path="/messages" component={Messages} />
        <SecureRoute path="/profile" component={Profile} />
      </Container>
    </Security>
  );
};

export default App;
