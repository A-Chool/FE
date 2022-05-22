import "./App.css";
import React, { useEffect } from "react";
import { history } from "./redux/configureStore";
import styled from "styled-components";

import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import NotFound from "./pages/NotFound";
import UserTeamBoard from "./pages/user/UserTeamBoard";
import UserCheckIn from "./pages/user/UserCheckIn";

import AdminTeamPage from "./pages/admin/AdminTeamPage";
import AdminUserPage from "./pages/admin/AdminUserPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import ChatingPage from "./pages/ChatingPage";
import MyPage from "./pages/MyPage";
// import ChatRoom from "./pages/ChatRoom";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import ChatContainer from "./components/chat/ChatContainer";
import { actionCreators as userActions } from "./redux/modules/user";
import { useDispatch } from "react-redux";
import KakaoOauth from "./pages/KakaoOauth";
import { getCookie } from "./shared/Cookie";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const kakaoToken = localStorage.kakaoToken;
    const userToken = getCookie("userToken");

    if (!!kakaoToken || !!userToken) {
      console.log(getCookie("userToken"));
      // console.log(kakaoToken);
      dispatch(userActions.getMyselfDB(userToken));
    }
  }, []);

  useEffect(() => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
  }, []);

  // console.log("____  ____  ____  ____  ____  ____  ____  ____ \n||A ||||- ||||c ||||h ||||o ||||o ||||l ||||! ||\n||__||||__||||__||||__||||__||||__||||__||||__||\n|/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\|");
  console.log(
    "   ______                       __                          ___  \n  /\\  _  \\                     /\\ \\                        /\\_ \\ \n  \\ \\ \\L\\ \\              ___   \\ \\ \\___      ___     ___   \\//\\ \\ \n   \\ \\  __ \\   _______  /'___\\  \\ \\  _ `\\   / __`\\  / __`\\   \\ \\ \\ \n    \\ \\ \\/\\ \\ /\\______\\/\\ \\__/   \\ \\ \\ \\ \\ /\\ \\L\\ \\/\\ \\L\\ \\   \\_\\ \\_  \n     \\ \\_\\ \\_\\\\/______/\\ \\____\\   \\ \\_\\ \\_\\\\ \\____/\\ \\____/   /\\____\\ \n      \\/_/\\/_/          \\/____/    \\/_/\\/_/ \\/___/  \\/___/    \\/____/"
  );

  return (
    <ContentWrap>
      <ChatContainer />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/admin" exact component={AdminLogin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/chat" exact component={ChatingPage} />
          <Route path="/my" exact component={MyPage} />
          <Route path="/admin/user" exact component={AdminUserPage} />
          <Route path="/admin/team" exact component={AdminTeamPage} />
          <Route path="/check-in" exact component={UserCheckIn} />
          <Route path="/team-board" exact component={UserTeamBoard} />
          <Route path="/api/user/kakao/callback" exact component={KakaoOauth} />
          {/* 지정 외 페이지 찾을때, not found 페이지 */}
          <Route path="/*" component={NotFound} />
        </Switch>
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
