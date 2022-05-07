import "./App.css";
import React from "react";
import { history } from "./redux/configureStore";
import styled from "styled-components";

import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import AdminUserPage from "./adminpages/AdminUserPage";
import AdminTeamPage from "./adminpages/AdminTeamPage";

import UserCheckIn from "./userpages/UserCheckIn";
import UserTeamBoard from "./userpages/UserTeamBoard";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import KakaoOauth from "./shared/KakaoOauth";
import ChatingPage from "./pages/ChatingPage";
// import ChatRoom from "./pages/ChatRoom";
function App() {
  return (
    <React.Fragment>
      <ContentWrap>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Login} />
          <Route path="/adminlogin" exact component={AdminLogin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/api/user/kakao/callback" exact component={KakaoOauth} />
          <Route path="/chat" exact component={ChatingPage} />
          <Route path="/AdminUserPage" exact component={AdminUserPage}></Route>
          <Route path="/AdminTeamPage" exact component={AdminTeamPage}></Route>
          <Route path="/UserCheckIn" exact component={UserCheckIn}></Route>
          <Route path="/UserTeamBoard" exact component={UserTeamBoard}></Route>
        </ConnectedRouter>
      </ContentWrap>
    </React.Fragment>
  );
}

const ContentWrap = styled.div`
  margin: 0 auto;
  max-width: 100%;
  max-height : 100%;
  box-sizing: border-box;
`

export default App;
