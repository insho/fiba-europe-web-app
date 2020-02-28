import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import WelcomeScreen from "./screens/WelcomeScreen";
import CompetitionsSummaryScreen from "./screens/CompetitionsSummaryScreen";
import CompetitionDetailScreen from "./screens/CompetitionDetailScreen";
import GameSummaryScreen from "./screens/GameSummaryScreen";
import AlgCompsScreen from "./screens/AlgCompsScreen";
// import BrandConsistencyScreen from "./screens/BrandConsistencyScreen";
import AlgOverviewScreen from "./screens/AlgOverviewScreen";

export default class App extends Component {




  render() {
    return (

  <Router>

        <div  >
        <Route path="/welcome" component={ WelcomeScreen }/>
        <Route path="/competitions-summary" component={ CompetitionsSummaryScreen }/>
        <Route path="/competition-detail" component={ CompetitionDetailScreen }/>
        <Route path="/games-summary" component={ GameSummaryScreen }/>
        <Route path="/machine-learning-alg-comps" component={ AlgCompsScreen }/>
        <Route path="/machine-learning-alg-summary" component={ AlgOverviewScreen }/>
        
        
        
          {/* <Route path="/brandconsistency/:brandId?" component={ BrandConsistencyScreen } /> */}
          
        </div>
        
      </Router>
    );
  }
}
