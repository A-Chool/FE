import "./App.css";
import React from "react";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from 'connected-react-router';
import {Route} from 'react-router-dom';

import AdminUserList from "./adminpages/AdminUserList";
import AdminTeamList from "./adminpages/AdminTeamList";
import AdminUserPage from "./adminpages/AdminUserPage";

import UserCheckIn from "./userpages/UserCheckIn";
import UserTeamBoard from "./userpages/UserTeamBoard";


function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/AdminUserPage" exact component={AdminUserPage}></Route>
        <Route path="/AdminUserList/:id" exact component={AdminUserList}></Route>
        <Route path="/AdminTeamList" exact component={AdminTeamList}></Route>
        <Route path="/UserCheckIn" exact component={UserCheckIn}></Route>
        <Route path="/UserTeamBoard" exact component={UserTeamBoard}></Route>
      </ConnectedRouter>
    </React.Fragment>
      
    
  );
}

export default App;
