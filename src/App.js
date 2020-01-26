import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import WelcomeScreen from "./screens/WelcomeScreen";
import CompetitionsSummaryScreen from "./screens/CompetitionsSummaryScreen";
import GameSummaryScreen from "./screens/GameSummaryScreen";
// import BrandConsistencyScreen from "./screens/BrandConsistencyScreen";


export default class App extends Component {




  render() {
    return (

  <Router>

        <div >
        <Route path="/welcome" component={ WelcomeScreen }/>
        <Route path="/competitions-summary" component={ CompetitionsSummaryScreen }/>
        <Route path="/games-summary" component={ GameSummaryScreen }/>
          {/* <Route path="/brandconsistency/:brandId?" component={ BrandConsistencyScreen } /> */}
          
        </div>
        
      </Router>
    );
  }
}
