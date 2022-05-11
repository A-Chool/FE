import "./App.css";
import React, { useEffect } from "react";
import { history } from "./redux/configureStore";
import styled from "styled-components";

import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import UserTeamBoard from "./pages/user/UserTeamBoard";
import UserCheckIn from "./pages/user/UserCheckIn";

import AdminTeamPage from "./pages/admin/AdminTeamPage";
import AdminUserPage from "./pages/admin/AdminUserPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import KakaoOauth from "./shared/KakaoOauth";
import ChatingPage from "./pages/ChatingPage";
// import ChatRoom from "./pages/ChatRoom";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import ChatContainer from "./components/chat/ChatContainer";

function App() {
  useEffect(() => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
  }, []);

  return (
    <ContentWrap>
      <ChatContainer />
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
  );
}

const ContentWrap = styled.div`
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
`;

export default App;
