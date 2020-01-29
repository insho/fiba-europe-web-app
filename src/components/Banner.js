import React, { Component } from "react";
import Select from "react-select";
import "../App.css";
import "./Banner.css";
import { selectStylesBanner } from "../options/SelectStyles";

import logo from "../images/logo-basketball.png";
import MenuButton from "./MenuButton";
import MenuButtonBall from "./MenuButtonBall";


class Banner extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleMouseDown = this.handleMouseDown.bind(this);
      }
   

selectorChangeEventSelectorOne = (selectedValue) => {
    this.setState({
        selectedValueSelectorOne: selectedValue
      });
    this.props.setParentSelectorStateSelectorOne(selectedValue)
}


selectorChangeEventSelectorTwo = (selectedValue) => {
    this.setState({
        selectedValueSelectorTwo: selectedValue
      });
    this.props.setParentSelectorStateSelectorTwo(selectedValue)
}

handleMouseDown(e) {
    this.props.toggleParentMenu()    
    e.stopPropagation();
  }


      render() {
        return (
<div id="banner-container">
            <div id="banner-container-inner--left">
              <div id="banner-hamburger-menu-container-row">
                <div id="banner-hamburger-menu-container-column">
                  <MenuButtonBall
                    className="hamburger-menu-button"
                    handleMouseDown={this.handleMouseDown}
                  />
                </div>
              </div>

              <div id="banner-logo-container" style={{
                height: '80%',
                width: 20,
                // backgroundImage: `url(${logo})`,
                backgroundSize: '80%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                margin: '0 14px'
              }}></div>

              <div id="banner-text-container">
                <div id="banner-text-row-container">
                  <div
                    className="banner-text-major"
                    id="Banner-text-major-dividor"
                  >
                    |{" "}
                  </div>
                  <div
                    className="banner-text-major"
                    id="banner-text-major-text"
                  >
                    {this.props.bannerTextMajor}
                  </div>
                </div>
                <div id="banner-text-row-container">
                  <div
                    className="banner-text-major"
                    id="banner-text-major-dividor"
                  >
                    {" "}
                  </div>
                  <div
                    className="banner-text-major"
                    id="banner-text-minor-text"
                  >
                    {this.props.bannerTextMinor}
                  </div>
                </div>
              </div>
            </div>

            <div id="banner-container-inner">
              <div
                className="banner-dropdown-container"
                id="banner-dropdown-container--left"
              >
                <div className="dropdown-selector-container">
                  {this.props.dropDownItemsListSelectorOne && (
                    <Select
                      className="drop-down-select"
                      value={this.props.selectedValueSelectorOne }
                      onChange={this.selectorChangeEventSelectorOne }
                      options={this.props.dropDownItemsListSelectorOne }
                      styles={selectStylesBanner}
                    />
                  )}
                </div>


                
              </div>

              
              <div
                className="banner-dropdown-container"
                id="banner-dropdown-container--right"
              >
                <div className="dropdown-selector-container">
                  {this.props.dropDownItemsListSelectorTwo && (
                    <Select
                      className="drop-down-select"
                      value={this.props.selectedValueSelectorTwo}
                      onChange={this.selectorChangeEventSelectorTwo}
                      options={this.props.dropDownItemsListSelectorTwo}
                      styles={selectStylesBanner}
                    />
                  )}
                </div>
</div>
            </div>
          </div>

);
  }
}
 
export default Banner;          