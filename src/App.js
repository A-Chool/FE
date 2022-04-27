import "./App.css";
import React from "react";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from 'connected-react-router';
// import {Route} from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>

      </ConnectedRouter>
    </React.Fragment>
      
    
  );
}

export default App;
