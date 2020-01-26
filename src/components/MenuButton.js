import React, { Component } from "react";
import "./MenuButton.css";
import hamburger from "../images/hamburger.svg";
 
class MenuButton extends Component {
  render() {
    return (
      <button id="roundButton" onMouseDown={this.props.handleMouseDown}>

                <img src={hamburger} alt="button"/> 
    </button>
    );
  }
}
 
export default MenuButton;