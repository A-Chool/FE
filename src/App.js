import "./App.css";
import React from "react";
import { history } from "./redux/configureStore";

import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import AdminUserList from "./adminpages/AdminUserList";
import AdminTeamList from "./adminpages/AdminTeamList";
import AdminUserPage from "./adminpages/AdminUserPage";
import AdminTeamPage from "./adminpages/AdminTeamPage";

import UserCheckIn from "./userpages/UserCheckIn";
import UserTeamBoard from "./userpages/UserTeamBoard";

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
        <Route path="/AdminUserPage" exact component={AdminUserPage}></Route>
        <Route path="/AdminTeamPage" exact component={AdminTeamPage}></Route>
        <Route path="/UserCheckIn" exact component={UserCheckIn}></Route>
        <Route path="/UserTeamBoard" exact component={UserTeamBoard}></Route>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
