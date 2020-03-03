import React, { Component } from "react";
import "./MenuButtonBall.css";
import hamburger from "../images/hamburger.svg";
import logo from "../images/logo-basketball.png";

class MenuButton extends Component {
  render() {
    return (
    
                <button id="roundButton"  onMouseDown={this.props.handleMouseDown} style={{
                height: '70px',
                width: '70px',
                backgroundImage: `url(${logo})`,
                backgroundSize: '100%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'
                // margin: '0 14px'
              }}>

              </button>
    
    );
  }
}
 
export default MenuButton;