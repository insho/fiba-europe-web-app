import React, { Component } from "react";
import "./Menu.css";
import sidebargraphic from "../images/sidebar-graphic.png";
import logo from "../images/logo-basketball.png";
import { NavLink } from "react-router-dom";
import MenuButtonBall from "../components/MenuButtonBall";


class Menu extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleMouseDown = this.handleMouseDown.bind(this);

  }

  handleMouseDown(e) {
    // console.log("MOUSE DOWN")

    if (!this.props.isWelcomeScreen) {
      this.props.toggleParentMenu()
    }

    // e.stopPropagation();
  }



  render() {
    var visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }


    const flyOutWidth = this.props.flyOutWidth || '25vw';

    return (
      <div id="flyoutMenu"
        className={visibility}
        style={{ "width": flyOutWidth }}
      >

        <div id="welcome-screen-sidebar-container" >
          <div id="sidebar-graphic-container" >
            <img src={sidebargraphic} id="sidebar-graphic" alt="sidebar-graphic" />
          </div>



          <div id="sidebar-logo-and-text-container">
            <div id="sidebar-logo-and-text-container--logo-container" onClick={() => this.handleMouseDown()} style={{ backGroundColor: "Red" }} >
              <img id="sidebar-logo" src={logo} alt="Logo" style={{ width: '80%', minWidth: '50%', height: undefined, aspectRatio: 3 / 2 }} />

            </div>
            <div id="sidebar-logo-and-text-container--text-container">

              <div className="sidebar-navigation">

                <div ><NavLink className="navlink-header" exact to="/welcome">Welcome Screen</NavLink></div>

                <div><div className="navlink-header" exact to="/machine-learning-summary">Machine Learning</div></div>
                <div ><NavLink className="navlink-text" exact to="/machine-learning-alg-summary">Overview</NavLink></div>
                <div ><NavLink className="navlink-text" exact to="/machine-learning-alg-comps">Alg Comparisons</NavLink></div>

                <div><div className="navlink-header" exact to="/competitions-summary">Competitions</div></div>
                <div ><NavLink className="navlink-text" exact to="/competitions-summary">Competitions Overview</NavLink></div>
                <div ><NavLink className="navlink-text" exact to="/competition-detail">Competition Detail</NavLink></div>
                <div ><NavLink className="navlink-text" exact to="/games-summary">Match Detail</NavLink></div>

              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Menu;