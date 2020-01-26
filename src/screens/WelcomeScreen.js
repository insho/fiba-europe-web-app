import React from "react";
import "./WelcomeScreen.css";

import Menu from "./Menu";

export default class WelcomeScreen extends React.Component {

state = {visible: true};

  componentDidMount() {
    this.setState({
        visible: true
    });

  }

  componentDidUpdate() {}

 

  render() {
    return (
        <div>
                  <Menu 
            menuVisibility={this.state.visible}/>

        <div className="simple-row-container">
        <div></div>
        <div id="welcome-screen-text-container">

            <div className="welcome-screen-text" id="welcome-screen-text-main-title">Fiba Basketball Analysis</div>

            <div className="welcome-screen-text" id="welcome-screen-text-sub-title" style={{paddingTop: "24px"}} >The Project:</div>
            <div className="welcome-screen-paragraph-container">
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>To better understand both predictive modeling using machine learning, as well as some basics about building react web apps, build predictive models using publicly available play by play data for Fiba Europe basketball games, and display some info/results about those findings here, in a react web app. Besides a variety of fun statistics, the end result should be algorithms that predict outcomes of a given game based on play by play information from the same game (at any given minute during the match). The process can be divided into four parts: </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>1. Acquiring the data </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph">2. Processing the data </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph">3. Creating and testing algorythms</div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph">4. Displaying results </div>
                            
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>This web app showcases data about roughly (X) Fiba Europe basketball games spanning (X) seasons, from X to Y. It is a relatively small subset of the roughly 40,000 games used to create and test the predictive algorythms. </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "6px", fontWeight: "italic"}}>The code for each of these steps (primarily python and sql; react-js for the app) along with some more detailed explainations of the process, is hosted on [github here](link). </div>
            </div>

            <div className="welcome-screen-text" id="welcome-screen-text-sub-title" style={{paddingTop: "12px", paddingBottom: "20px"}}>Process Overview</div>
            <div className="welcome-screen-paragraph-container">
            <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{fontSize: "20px", fontWeight:"bold"}}>1. [Acquiring Data](link)</div>
              <div className="welcome-screen-paragraph-container">
                <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>SOME TEXT ABOUT THAT</div>
              </div>
            </div>
            </div>
        </div>
        </div>
    );
  }
}
