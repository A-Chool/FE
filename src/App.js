import "./App.css";
import React from "react";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Login} />
        <Route path="/adminlogin" exact component={AdminLogin} />
        <Route path="/signup" exact component={Signup} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
