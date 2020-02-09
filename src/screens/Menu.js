import React, { Component } from "react";
import "./Menu.css";
import sidebargraphic from "../images/sidebar-graphic.png";
import logo from "../images/logo-basketball.png";
import { NavLink } from "react-router-dom";

 
class Menu extends Component {
  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    return (
      <div id="flyoutMenu"
          //  onMouseDown={this.props.handleMouseDown} 
           className={visibility}>

            <div id="welcome-screen-sidebar-container">
                        <div id="sidebar-graphic-container" >
                            <img src={sidebargraphic} id="sidebar-graphic" alt="sidebar-graphic"/>
                        </div>

                        <div id="sidebar-logo-and-text-container">
                            <div id="sidebar-logo-and-text-container--logo-container"   onMouseDown={this.props.closeMenu}>
                                <img id="sidebar-logo" src={logo} alt="Logo"  style={{width: '80%', minWidth: '50%',height: undefined,aspectRatio: 3 / 2}}  />
                            </div>
                            <div id="sidebar-logo-and-text-container--text-container">
                                
                                        {/* <div id="sidebar-text-reports-include">Reports include:</div> */}
                                        <div className="sidebar-navigation">

                                        <div ><NavLink className="navlink-header" exact to="/welcome">Welcome Screen</NavLink></div>

                                        <div><div className= "navlink-header" exact to="/machine-learning-summary">Machine Learning</div></div>
                                        <div ><NavLink className= "navlink-text" exact to="/machine-learning-alg-summary">Overview</NavLink></div>
                                        <div ><NavLink className= "navlink-text" exact to="/machine-learning-alg-comps">Alg Comparisons</NavLink></div>

                                        <div><div className= "navlink-header" exact to="/competitions-summary">Competitions</div></div>
                                        <div ><NavLink className= "navlink-text" exact to="/competitions-summary">Competitions</NavLink></div>
                                        <div ><NavLink className= "navlink-text" exact to="/games-summary">Matches</NavLink></div>
                                        <div ><NavLink className= "navlink-text" exact to="/players-summary">Players</NavLink></div>
                                                                                



                                        </div>

                            </div>
                        </div>
                    </div>           

      </div>
    );
  }
}
 
export default Menu;